import React, { useState } from "react"

import { Button, Grid, CircularProgress } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import { PayPalButton } from "react-paypal-button-v2"

import Snackbar from "../../Snackbar"

import { generateCoinbaseCharge, CoinbaseChargeT } from "../../../misc/ajaxManager"

type Props = {
	amount: number
	method: "PayPal" | "Crypto"
	type: "slots" | "premium"
	goBack: () => void
}

const PurchaseButton = ({ amount, method, type, goBack }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const {
		REACT_APP_ENV_LOCAL,
		REACT_APP_PAYPAL_CLIENT_ID,
		REACT_APP_COINBASE_API_KEY,
	} = process.env

	const [message, setMessage] = useState<string | null>(null)

	const [cryptoUrl, setCryptoUrl] = useState("")

	const [cryptoCode, setCryptoCode] = useState("")

	const [loading, setLoading] = useState(true)

	const [error, setError] = useState(false)

	const onSuccess = (details: any) => {
		console.log("success!")
		console.log("Order id: " + details.id)

		setMessage(translate("success_message", lng))
	}

	const onError = (error: any) => {
		console.log("error...")
		console.log(error)

		setMessage(translate("error_messages", lng, 6))
	}

	const renderPaymentMethod = () => {
		const finalAmount = type === "slots" ? amount * 10 : amount * 5

		if (method === "PayPal") {
			if (REACT_APP_ENV_LOCAL) {
				return (
					<PayPalButton
						amount={finalAmount}
						shippingPreference="NO_SHIPPING"
						onSuccess={onSuccess}
						onError={onError}
						catchError={onError}
						data-testid="test_paypal_btn"
					/>
				)
			} else {
				return (
					<PayPalButton
						amount={finalAmount}
						shippingPreference="NO_SHIPPING"
						onSuccess={onSuccess}
						onError={onError}
						catchError={onError}
						options={{
							clientId: REACT_APP_PAYPAL_CLIENT_ID,
						}}
					/>
				)
			}
		} else {
			if (REACT_APP_COINBASE_API_KEY) {
				const charge: CoinbaseChargeT = {
					name: "testing" + type,
					description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
					local_price: {
						amount: finalAmount,
						currency: "USD",
					},
					pricing_type: "fixed_price",
				}

				const coinbaseCharge = generateCoinbaseCharge(REACT_APP_COINBASE_API_KEY, charge)

				coinbaseCharge.then((data: any) => {
					console.log(data)
					setCryptoCode(data.code)

					setCryptoUrl(data.hosted_url)

					setLoading(false)
				})
			}

			return (
				<>
					{loading && <CircularProgress />}
					{cryptoUrl && (
						<a href={cryptoUrl} target="_blank">
							<Button variant="contained" color="primary" disableElevation>
								purchase now
							</Button>
						</a>
					)}
				</>
			)
		}
	}

	return (
		<>
			<Grid container justify="center" spacing={2}>
				<Grid
					item
					xs={12}
					style={{
						display: "flex",
						justifyContent: "center",
						textAlign: "center",
						alignItems: "center",
					}}
				>
					{renderPaymentMethod()}
				</Grid>
				<Grid
					item
					xs={12}
					style={{
						display: "flex",
						justifyContent: "center",
						textAlign: "center",
						alignItems: "center",
					}}
				>
					<Button variant="contained" color="secondary" onClick={() => goBack()}>
						{translate("go_back", lng, 0)}
					</Button>
				</Grid>
			</Grid>
			{message && (
				<Snackbar message={message} open={message ? true : false} duration={45000} />
			)}
		</>
	)
}

export default PurchaseButton
