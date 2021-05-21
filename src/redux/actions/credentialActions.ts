import { EditCredentialI, EDIT_CREDENTIAL } from "../types"

import { CredentialT } from "../../misc/types"

export const editCredential = (credential: CredentialT): EditCredentialI => {
	return {
		type: EDIT_CREDENTIAL,
		payload: credential,
	}
}
