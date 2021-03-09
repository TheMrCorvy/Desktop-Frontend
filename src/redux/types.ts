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

/******************************************************************************** toggle drawer */
export const TOGGLE_DRAWER = "TOGGLE_DRAWER"

export interface DrawerStateI {
	open: boolean
}

interface ToggleDrawerActionI {
	type: typeof TOGGLE_DRAWER
	payload: boolean
}

export type DrawerAction = ToggleDrawerActionI

/******************************************************************************** auth token */
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

export interface AuthTokenI {
	token: null | string
}

interface AuthActionI {
	type: typeof LOG_IN | typeof LOG_OUT
	payload: string | null
}

export type AuthAction = AuthActionI
