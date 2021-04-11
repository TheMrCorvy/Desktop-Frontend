import React, { useRef } from "react"

import { Button } from "@material-ui/core"

type Props = {
	amount: number
	method: "PayPal" | "Crypto"
	type: "slots" | "premium"
	goBack: () => void
	cancelBtn?: string
}

const PurchaseButton = ({ amount, method, type, cancelBtn, goBack }: Props) => {
	const paypal = useRef<HTMLHeadingElement>(null)

	const renderPaymentMethod = () => {
		if (method === "PayPal") {
			// window.paypal
			// 	.Buttons({
			// 		createOrder: (data, actions, err) => {
			// 			return actions.order.create({
			// 				intent: "CAPTURE",
			// 				purchase_units: [
			// 					{
			// 						description: "Cool looking table",
			// 						amount: {
			// 							currency_code: "USD",
			// 							value: 650.0,
			// 						},
			// 					},
			// 				],
			// 			})
			// 		},
			// 		onApprove: async (data, actions) => {
			// 			const order = await actions.order.capture()
			// 			console.log(order)
			// 		},
			// 		onError: (err) => {
			// 			console.error(err)
			// 		},
			// 	})
			// 	.render(paypal.current)
		} else {
		}
	}

	return (
		<>
			<div>
				<div ref={paypal}></div>
				{cancelBtn && (
					<Button variant="contained" color="primary" onClick={() => goBack()}>
						{cancelBtn}
					</Button>
				)}
			</div>
		</>
	)
}

export default PurchaseButton
