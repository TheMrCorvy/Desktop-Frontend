import { SET_THEME, ThemeAction, DarkThemeStateI, light, dark } from "../types"

const localStorageTheme = localStorage.getItem("preferred_theme")

let initialState: DarkThemeStateI = {
	theme: dark,
}

if (localStorageTheme) {
	if (localStorageTheme === "dark") {
		initialState = {
			theme: dark,
		}
	} else {
		initialState = {
			theme: light,
		}
	}
} else {
	initialState = {
		theme: dark,
	}
}

const themeReducer = (state = initialState, action: ThemeAction) => {
	switch (action.type) {
		case SET_THEME:
			return {
				...state,
				theme: action.payload,
			}

		default:
			return state
	}
}

export default themeReducer
