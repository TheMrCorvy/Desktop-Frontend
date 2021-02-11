/******************************************************************************** translations */
export const SET_LANGUAGE = "SET_LANGUAGE"

export interface LangStateI {
	lng: string
}

interface SetLanguageActionI {
	type: typeof SET_LANGUAGE
	payload: string
}

export type LangAction = SetLanguageActionI

/******************************************************************************** toggle dark theme */

export const SET_THEME = "SET_THEME"

export const light = "light"
export const dark = "dark"

export interface DarkThemeStateI {
	theme: typeof light | typeof dark
}

interface ToggleDarkThemeActionI {
	type: typeof SET_THEME
	payload: typeof light | typeof dark
}

export type ThemeAction = ToggleDarkThemeActionI
