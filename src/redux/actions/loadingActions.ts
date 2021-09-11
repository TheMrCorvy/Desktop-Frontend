import { LoadingAction, TOGGLE_LOADING } from "../types"

export const toggleLoading = (loading: boolean): LoadingAction => {
	return {
		type: TOGGLE_LOADING,
		payload: loading,
	}
}
