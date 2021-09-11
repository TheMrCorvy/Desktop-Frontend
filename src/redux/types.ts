import { ReduxCredentialT } from "../misc/types"

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

/******************************************************************************** auth */
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

export interface AuthTokenI {
	token: null | string
}

interface AuthActionI {
	type: typeof LOG_IN | typeof LOG_OUT
	payload: null | string
}

export type AuthAction = AuthActionI

/******************************************************************************** error handling */
export const ERROR_500 = "ERROR_500"

export interface ErrorMessageI {
	err: string | null
}

export interface ErrorI {
	type: typeof ERROR_500
	payload: string | null
}

/******************************************************************************** create / edit credential */

export const EDIT_CREDENTIAL = "EDIT_CREDENTIAL"

export const CLEAR_CREDENTIAL = "CLEAR_CREDENTIAL"

export const INITIALIZE_CREDENTIAL = "INITIALIZE_CREDENTIAL"

export const SET_DECRYPTED_CREDENTIAL = "SET_DECRYPTED_CREDENTIAL"

export const DELETE_CREDENTIAL_PROPERTY = "DELETE_CREDENTIAL_PROPERTY"

export interface CredentialI {
	credential: ReduxCredentialT
}

export interface EditCredentialI {
	type:
		| typeof EDIT_CREDENTIAL
		| typeof CLEAR_CREDENTIAL
		| typeof INITIALIZE_CREDENTIAL
		| typeof SET_DECRYPTED_CREDENTIAL
		| typeof DELETE_CREDENTIAL_PROPERTY
	payload: ReduxCredentialT
}

/******************************************************************************** show loading animation */
export const TOGGLE_LOADING = "TOGGLE_LOADING"
export const SET_LOADING_ERROR = "SET_LOADING_ERROR"
export const CLEAR_LOADING_ERROR = "CLEAR_LOADING_ERROR"

export interface LoadingStateI {
	loading: boolean
	error?: string
}

export interface ToggleLoadingAction {
	type: typeof TOGGLE_LOADING
	payload: boolean
}

export interface SetErrorAction {
	type: typeof SET_LOADING_ERROR
	payload: {
		loading: boolean
		error: string
	}
}

export interface ClearErrorAction {
	type: typeof CLEAR_LOADING_ERROR
	payload: boolean
}

export type LoadingAction = ToggleLoadingAction | SetErrorAction | ClearErrorAction
