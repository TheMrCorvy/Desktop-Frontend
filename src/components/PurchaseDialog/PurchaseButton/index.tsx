import React, { useState } from "react"

import { Button, Grid, CircularProgress, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

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
	testing?: boolean
}

const useStyles = makeStyles({
	link: {
		textDecoration: "none",
		marginBottom: "2rem",
	},
	marginBottom: {
		marginBottom: "2rem",
	},
})

const PurchaseButton = ({ amount, method, type, goBack, testing }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const {
		REACT_APP_ENV_LOCAL,
		REACT_APP_PAYPAL_CLIENT_ID,
		REACT_APP_COINBASE_API_KEY,
	} = process.env

	const [message, setMessage] = useState<string | null>(null)

	const [cryptoUrl, setCryptoUrl] = useState("")

	const [loading, setLoading] = useState(true)

	const [error, setError] = useState(false)

	const [firstCall, setFirstCall] = useState(true)

	const onSuccess = (details: any) => {
		console.log("success!")
		console.log("Order id: " + details.id)

		setMessage(translate("success_message", lng))
	}

	const onError = (error: any) => {
		console.log("error...")
		console.log(error)

		setMessage(translate("error_messages", lng, 6))

		setError(true)
		setLoading(false)
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
			if (REACT_APP_COINBASE_API_KEY && firstCall) {
				setFirstCall(false)

				const name = translate("purchase_name", lng, type === "slots" ? 0 : 1)

				const description = translate("purchase_description", lng, type === "slots" ? 0 : 1)

				const charge: CoinbaseChargeT = {
					name,
					description,
					local_price: {
						amount: finalAmount,
						currency: "USD",
					},
					pricing_type: "fixed_price",
				}

				const coinbaseCharge = generateCoinbaseCharge(REACT_APP_COINBASE_API_KEY, charge)

				coinbaseCharge.then((data: any) => {
					if (!data.success) {
						onError(data.err)
					} else {
						setCryptoUrl(data.data.hosted_url)

						setLoading(false)

						console.log(data.data.code)
					}
				})
			}

			return (
				<>
					{loading && <CircularProgress className={classes.marginBottom} />}

					{cryptoUrl && (
						<a href={cryptoUrl} target="_blank" className={classes.link}>
							<Button variant="contained" color="primary" disableElevation>
								{translate("purchase_now", lng)}
							</Button>
						</a>
					)}

					{error && (
						<Typography variant="body2" className={classes.marginBottom}>
							{translate("error_messages", lng, 6)}
						</Typography>
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
