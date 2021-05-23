import { EDIT_CREDENTIAL, EditCredentialI, CredentialI, CLEAR_CREDENTIAL } from "../types"

let initialState: CredentialI = {
	credential: {},
}

const credentialReducer = (state = initialState, action: EditCredentialI) => {
	switch (action.type) {
		case EDIT_CREDENTIAL:
			return {
				...state,
				credential: action.payload,
			}

		case CLEAR_CREDENTIAL:
			return {
				...state,
				credential: action.payload,
			}

		default:
			return state
	}
}

export default credentialReducer
