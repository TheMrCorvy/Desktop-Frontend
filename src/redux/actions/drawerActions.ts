import { DrawerAction, TOGGLE_DRAWER } from "../types"

export const toggleDrawer = (open: boolean): DrawerAction => {
	return {
		type: TOGGLE_DRAWER,
		payload: open,
	}
}
