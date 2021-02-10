import { LangAction, SET_LANGUAGE } from "../types"

export const setLanguage = (lang: string): LangAction => {
	localStorage.setItem("preferred_language", lang)

	return {
		type: SET_LANGUAGE,
		payload: lang,
	}
}
