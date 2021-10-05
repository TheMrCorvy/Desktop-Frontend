import { CoinbaseChargeT, ApiCallI, ApiResponseT } from "./types"

export const callApi = async (params: ApiCallI): Promise<ApiResponseT> => {
	const { lng, endpoint, method, body, token } = params

	const localUrl = "http://localhost:8000/api"

	const productionUrl = "https://pasunashi-backend.herokuapp.com/api"

	const { REACT_APP_USE_LOCAL_API } = process.env

	const baseUri = REACT_APP_USE_LOCAL_API ? localUrl : productionUrl

	return await fetch(baseUri + endpoint, {
		method,
		headers: new Headers({
			"Content-Type": "application/json",
			Accept: "application/json",
			"Accept-Language": lng,
			Authorization: token ? "Bearer " + token : "",
		}),
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((response) => response)
		.catch((response) => {
			console.error(response)

			return response
		})
}

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
