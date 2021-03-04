import { AUTH_TOKEN, AuthAction, AuthTokenI } from "../types"

const initialState: AuthTokenI = {
	token: null,
}

const authTokenReducer = (state = initialState, action: AuthAction) => {
	switch (action.type) {
		case AUTH_TOKEN:
			return {
				...state,
				token: action.payload,
			}

		default:
			return state
	}
}

export default authTokenReducer
