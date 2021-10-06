import {
	ToggleLoadingAction,
	TOGGLE_LOADING,
	SetErrorAction,
	SET_LOADING_ERROR,
	ClearErrorAction,
	CLEAR_LOADING_ERROR,
} from "../types"

export const toggleLoading = (loading: boolean): ToggleLoadingAction => {
	return {
		type: TOGGLE_LOADING,
		payload: {
			loading,
			error: "",
		},
	}
}

export const setErrorLoading = (errMessage: string): SetErrorAction => {
	return {
		type: SET_LOADING_ERROR,
		payload: {
			loading: false,
			error: errMessage,
		},
	}
}

export const clearError = (): ClearErrorAction => {
	return {
		type: CLEAR_LOADING_ERROR,
		payload: false,
	}
}
