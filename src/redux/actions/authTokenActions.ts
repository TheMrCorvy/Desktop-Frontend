import { AuthAction, AUTH_TOKEN } from "../types"

export const authUser = (token: string): AuthAction => {
	//we won't be setting the token on the local storage or anything
	//it'll be stored just on the memory, and if the user refreshes the page, the session will be closed
	return {
		type: AUTH_TOKEN,
		payload: token,
	}
}
