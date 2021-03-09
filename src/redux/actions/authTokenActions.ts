import { AuthAction, LOG_IN, LOG_OUT } from "../types"

export const login = (token: string): AuthAction => {
	//we won't be setting the token on the local storage or anything
	//it'll be stored just on the memory, and if the user refreshes the page, the session will be closed
	return {
		type: LOG_IN,
		payload: token,
	}
}

export const logOut = (): AuthAction => {
	return {
		type: LOG_OUT,
		payload: null,
	}
}
