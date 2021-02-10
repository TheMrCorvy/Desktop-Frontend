import { LangAction, SET_LANGUAGE } from "../types"

const setLanguage = (lang: string): LangAction => {
	localStorage.setItem("language", lang)

	return {
		type: SET_LANGUAGE,
		payload: lang,
	}
}

export default setLanguage
