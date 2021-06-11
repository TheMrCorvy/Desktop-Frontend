import {
	EDIT_CREDENTIAL,
	INITIALIZE_CREDENTIAL,
	EditCredentialI,
	CredentialI,
	CLEAR_CREDENTIAL,
	SET_DECRYPTED_CREDENTIAL,
} from "../types"

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

		case INITIALIZE_CREDENTIAL:
			return {
				...state,
				credential: action.payload,
			}

		case SET_DECRYPTED_CREDENTIAL:
			return {
				...state,
				credential: action.payload,
			}

		default:
			return state
	}
}

export default credentialReducer
