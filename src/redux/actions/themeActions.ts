import { ThemeAction, TOGGLE_DARK_THEME } from "../types"

export const toggleDarkTheme = (theme: string): ThemeAction => {
	localStorage.setItem("preferred_theme", theme)

	return {
		type: TOGGLE_DARK_THEME,
		payload: theme,
	}
}
