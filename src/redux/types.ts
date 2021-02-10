export const SET_LANGUAGE = "SET_LANGUAGE"

export interface LangStateI {
	language: string
}

interface SetLanguageActionI {
	type: typeof SET_LANGUAGE
	payload: string
}

export type LangAction = SetLanguageActionI
