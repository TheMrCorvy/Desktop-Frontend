import { LOG_IN, LOG_OUT, AuthAction, AuthTokenI } from "../types"

const initialState: AuthTokenI = {
	token: null,
}

const authTokenReducer = (state = initialState, action: AuthAction) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				token: action.payload,
			}

		case LOG_OUT:
			return {
				...state,
				token: action.payload,
			}

		default:
			return state
	}
}

export default authTokenReducer
