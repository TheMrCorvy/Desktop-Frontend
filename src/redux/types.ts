/******************************************************************************** translations */
export const SET_LANGUAGE = "SET_LANGUAGE"

export interface LangStateI {
	language: string
}

interface SetLanguageActionI {
	type: typeof SET_LANGUAGE
	payload: string
}

export type LangAction = SetLanguageActionI

/******************************************************************************** toggle dark theme */

export const SET_THEME = "SET_THEME"

export interface DarkThemeStateI {
	theme: string
}

interface ToggleDarkThemeActionI {
	type: typeof SET_THEME
	payload: string
}

export type ThemeAction = ToggleDarkThemeActionI
