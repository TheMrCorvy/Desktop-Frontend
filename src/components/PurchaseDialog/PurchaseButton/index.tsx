import React from "react"

import { Button, Grid } from "@material-ui/core"

import { PayPalButton } from "react-paypal-button-v2"

type Props = {
	amount: number
	method: "PayPal" | "Crypto"
	type: "slots" | "premium"
	goBack: () => void
	cancelBtn?: string
}

const PurchaseButton = ({ amount, method, type, cancelBtn, goBack }: Props) => {
	const { REACT_APP_ENV_LOCAL, REACT_APP_PAYPAL_CLIENT_ID } = process.env

	const onSuccess = (details: any, data: any) => {
		console.log("success!")
		console.log(details)
		console.log(data)
	}

	const onError = (error: any) => {
		console.log("error...")
		console.log(error)
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
			return (
				<>
					<Button variant="contained" color="primary">
						crypto
					</Button>
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
					{cancelBtn && (
						<Button variant="contained" color="secondary" onClick={() => goBack()}>
							{cancelBtn}
						</Button>
					)}
				</Grid>
			</Grid>
		</>
	)
}

export default PurchaseButton
