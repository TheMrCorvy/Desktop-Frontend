import { TOGGLE_LOADING, LoadingAction, LoadingStateI } from "../types"

const initialState: LoadingStateI = {
	loading: false,
}

const loadingReducer = (state = initialState, action: LoadingAction) => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return {
				...state,
				loading: action.payload,
			}

		default:
			return state
	}
}

export default loadingReducer
