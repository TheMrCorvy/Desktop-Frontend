import {
	TOGGLE_LOADING,
	LoadingAction,
	LoadingStateI,
	SET_LOADING_ERROR,
	CLEAR_LOADING_ERROR,
} from "../types"

const initialState: LoadingStateI = {
	loading: false,
}

const loadingReducer = (state = initialState, action: LoadingAction) => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return {
				...state,
				loading: action.payload.loading,
				error: action.payload.error,
			}

		case SET_LOADING_ERROR:
			return {
				loading: action.payload.loading,
				error: action.payload.error,
			}

		case CLEAR_LOADING_ERROR:
			return {
				loading: action.payload,
			}

		default:
			return state
	}
}

export default loadingReducer
