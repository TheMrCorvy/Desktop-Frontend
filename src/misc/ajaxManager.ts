import { CredentialT } from "../components/CredentialCard"
import { credential4Testing } from "./Data4Testing"

export type UserT = {
	name: string
	mainEmail: string
	recoveryEmail: string
	phone: string
	availableSlots: number
	role: "free" | "semi-premium" | "premium" | "admin"
	id: number
}

export type ApiResponseLoginT = {
	token: string
	user_data: UserT
	user_credentials: CredentialT[]
}

export type ApiResponseGetCredentialsT = {
	available_slots: number
	user_credentials: CredentialT[]
}

export const getCredentialsFromApi = (id: number, token: string | null) => {
	const { REACT_APP_ENV_LOCAL } = process.env

	let apiResponse: ApiResponseGetCredentialsT

	if (REACT_APP_ENV_LOCAL) {
		apiResponse = {
			available_slots: 3,
			user_credentials: credential4Testing,
		}
	} else {
		//i'm going to leave this until i'll start making the api
		apiResponse = {
			available_slots: 3,
			user_credentials: credential4Testing,
		}
		console.log("getting the fresh data, using the token: " + token)
	}

	return apiResponse
}
