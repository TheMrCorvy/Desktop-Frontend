import { EDIT_CREDENTIAL, EditCredentialI, CredentialI } from "../types"

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

		default:
			return state
	}
}

export default credentialReducer
