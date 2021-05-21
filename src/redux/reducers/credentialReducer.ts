import { EDIT_CREDENTIAL, EditCredentialI } from "../types"

import { CredentialT } from "../../misc/types"

let initialState: CredentialT = {
	id: 0,
	user_id: 0,
	company_id: null,
	company_name: "",
	url_logo: null,
	last_seen: "",
	recently_seen: "",
	user_name: null,
	char_count: null,
	created_at: "",
	updated_at: "",
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
