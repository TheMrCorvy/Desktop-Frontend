import { CredentialT, CoinbaseChargeT, ApiResponseGetCredentialsT, ApiCallI } from "./types"
import { credential4Testing } from "./Data4Testing"

export const callApi = async ({ preferredLang, endpoint, method, envIs, body }: ApiCallI) => {
	const localUrl = "http://localhost:8000/api/"

	const productionUrl = "https://pasunashi-backend.herokuapp.com/api"

	const baseUri = envIs === "local" ? localUrl : productionUrl

	return await fetch(baseUri + endpoint, {
		method,
		headers: new Headers({
			"Content-Type": "application/json",
			Accept: "application/json",
			"Accept-Language": preferredLang,
		}),
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((response) => {
			return response
		})
		.catch((response) => {
			console.error(response)

			return undefined
		})
}

export const getCredentialsFromApi = (id: number, token: string | null) => {
	const { REACT_APP_ENV_LOCAL } = process.env

	let apiResponse: ApiResponseGetCredentialsT

	if (REACT_APP_ENV_LOCAL) {
		apiResponse = {
			slots_available: 3,
			user_credentials: credential4Testing,
		}
	} else {
		//i'm going to leave this until i'll start making the api
		apiResponse = {
			slots_available: 3,
			user_credentials: credential4Testing,
		}
		console.log("getting the fresh data, using the token: " + token)
	}

	return apiResponse
}

export const findCredentialFromApi = (token: string | null, decrypted: boolean, agent?: string) => {
	const { REACT_APP_ENV_LOCAL } = process.env

	let apiResponse: {
		credential: CredentialT
	}

	if (REACT_APP_ENV_LOCAL) {
		//i'm going to leave this until i'll start making the api

		apiResponse = {
			credential: credential4Testing[0],
		}

		console.log("getting the fresh data, using the token: " + token)
		console.log(`It was a petition for the credential ${decrypted ? "decripted" : "encrypted"}`)
		console.log("user agent was (if required): " + agent)
	} else {
		apiResponse = {
			credential: credential4Testing[0],
		}
	}

	return apiResponse
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
