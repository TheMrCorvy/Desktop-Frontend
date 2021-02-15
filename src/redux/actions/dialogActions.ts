import { DialogAction, TOGGLE_DIALOG } from "../types"

export const toggleDrawer = (dialogIsOpen: boolean): DialogAction => {
	return {
		type: TOGGLE_DIALOG,
		payload: dialogIsOpen,
	}
}
