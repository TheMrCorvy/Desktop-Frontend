import { TOGGLE_DARK_THEME, ThemeAction, DarkThemeStateI } from "../types"

const localStorageTheme = localStorage.getItem("preferred_theme")

const initialState: DarkThemeStateI = {
	theme: localStorageTheme ? localStorageTheme : "dark",
}

const themeReducer = (state = initialState, action: ThemeAction) => {
	switch (action.type) {
		case TOGGLE_DARK_THEME:
			return {
				...state,
				theme: action.payload,
			}

		default:
			return state
	}
}

export default themeReducer
