import { SET_LANGUAGE, LangAction, LangStateI } from "../types"

const localStorageLang = localStorage.getItem("preferred_language")

const navLang = navigator.language.substring(0, 2)

let initialState: LangStateI = {
	lng: "",
}

// first we check if we can use the language of the browser as the default
// else, the default will be "en"
const initialLang = navLang === "en" || navLang === "es" || navLang === "jp" ? navLang : "en"

// then we check if there is any preferred_language stored in the device
// else, will go the lang got from the validation before
initialState.lng = localStorageLang ? localStorageLang : initialLang

const langReducer = (state = initialState, action: LangAction) => {
	switch (action.type) {
		case SET_LANGUAGE:
			return {
				...state,
				lng: action.payload,
			}

		default:
			return state
	}
}

export default langReducer
