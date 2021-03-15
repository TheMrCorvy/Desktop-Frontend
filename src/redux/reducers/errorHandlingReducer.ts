import { ERROR_500, ErrorI, ErrorMessageI } from "../types"

const initialState: ErrorMessageI = {
	err: null,
}

const authTokenReducer = (state = initialState, action: ErrorI) => {
	switch (action.type) {
		case ERROR_500:
			return {
				...state,
				err: action.payload,
			}

		default:
			return state
	}
}

export default authTokenReducer
