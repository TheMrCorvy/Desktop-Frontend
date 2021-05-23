import { CLEAR_CREDENTIAL, EditCredentialI, EDIT_CREDENTIAL } from "../types"

import { AccessCredentialPropT, CredentialPropValueT, ReduxCredentialT } from "../../misc/types"

type CredentialProp = {
	oldCredential: ReduxCredentialT
	prop: AccessCredentialPropT
	newValue: CredentialPropValueT
}
// I'll use edit credential to manage the writing on the inputs, either for editing or creating a new one
export const editCredential = (editing: CredentialProp): EditCredentialI => {
	return {
		type: EDIT_CREDENTIAL,
		payload: { ...editing.oldCredential, [editing.prop]: editing.newValue },
	}
}

// This action will be called when entering the create credential view
export const clearCredential = (): EditCredentialI => {
	return {
		type: CLEAR_CREDENTIAL,
		payload: {},
	}
}
