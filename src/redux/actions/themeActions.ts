import { ThemeAction, SET_THEME, light, dark } from "../types"

export const setTheme = (theme: typeof light | typeof dark): ThemeAction => {
	localStorage.setItem("preferred_theme", theme)

	return {
		type: SET_THEME,
		payload: theme,
	}
}
