import { UserT } from "../redux/types"
import { CredentialT } from "../components/CredentialCard"

export type ApiResponseLoginT = {
	token: string
	user_data: UserT
	user_credentials: CredentialT[]
}

export type ApiResponseGetCredentialsT = {
	available_slots: number
	user_credentials: CredentialT[]
}
