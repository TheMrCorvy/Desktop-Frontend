import { CredentialT } from "../components/CredentialCard"

export type UserT = {
	name: string
	mainEmail: string
	recoveryEmail: string
	phone: string
	availableSlots: number
	role: "free" | "semi-premium" | "premium" | "admin"
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
