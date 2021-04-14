import { CredentialT } from "./types"
import { credential4Testing } from "./Data4Testing"

export type UserT = {
	name: string
	email: string
	recovery_email: string
	slots_available: number
	role: "free" | "semi-premium" | "premium" | "admin"
	id: number
	phone_number: string
	anti_fishing_secret: string
}

export type ApiResponseLoginT = {
	token: string
	user_data: UserT
	user_credentials: CredentialT[]
	isAuthorized?: boolean
}

export type ApiResponseGetCredentialsT = {
	slots_available: number
	user_credentials: CredentialT[]
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

export const findCredentialFromApi = (token: string | null) => {
	const { REACT_APP_ENV_LOCAL } = process.env

	let apiResponse: {
		credential: CredentialT
	}

	if (REACT_APP_ENV_LOCAL) {
		apiResponse = {
			credential: credential4Testing[0],
		}
	} else {
		//i'm going to leave this until i'll start making the api
		apiResponse = {
			credential: credential4Testing[0],
		}
		console.log("getting the fresh data, using the token: " + token)
	}

	return apiResponse
}

export type CoinbaseChargeT = {
	name: string
	description: string
	local_price: {
		amount: number
		currency: string
	}
	pricing_type: string
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
