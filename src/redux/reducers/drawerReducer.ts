import { TOGGLE_DRAWER, DrawerAction, DrawerStateI } from "../types"

const initialState: DrawerStateI = {
	open: false,
}

const drawerReducer = (state = initialState, action: DrawerAction) => {
	switch (action.type) {
		case TOGGLE_DRAWER:
			return {
				...state,
				open: action.payload,
			}

		default:
			return state
	}
}

export default drawerReducer
