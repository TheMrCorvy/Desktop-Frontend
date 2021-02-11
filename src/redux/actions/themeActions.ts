import { ThemeAction, SET_THEME } from "../types"

export const toggleDarkTheme = (theme: string): ThemeAction => {
	localStorage.setItem("preferred_theme", theme)

	return {
		type: SET_THEME,
		payload: theme,
	}
}
