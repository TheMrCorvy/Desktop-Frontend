import { CoinbaseChargeT } from "../misc/types"

export const generateCoinbaseCharge = (apiKey: string, body: CoinbaseChargeT) => {
	return fetch("https://api.commerce.coinbase.com/charges", {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"X-CC-Version": "2018-03-22",
			"X-CC-Api-Key": apiKey,
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((data) => {
			const res = {
				successful: true,
				data: data.data,
			}

			return res
		})
		.catch((error: any) => {
			return {
				successful: false,
				err: error,
			}
		})
}
