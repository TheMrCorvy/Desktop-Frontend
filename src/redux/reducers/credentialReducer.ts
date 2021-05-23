import { EDIT_CREDENTIAL, EditCredentialI } from "../types"

import { ReduxCredentialT } from "../../misc/types"

let initialState: ReduxCredentialT = {}

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
