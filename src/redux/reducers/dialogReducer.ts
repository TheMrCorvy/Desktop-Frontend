import { TOGGLE_DIALOG, DialogAction, DialogStateI } from "../types"

const initialState: DialogStateI = {
	dialogIsOpen: false,
}

const dialogReducer = (state = initialState, action: DialogAction) => {
	switch (action.type) {
		case TOGGLE_DIALOG:
			return {
				...state,
				dialogIsOpen: action.payload,
			}

		default:
			return state
	}
}

export default dialogReducer
