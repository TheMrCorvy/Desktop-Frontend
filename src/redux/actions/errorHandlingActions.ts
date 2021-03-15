import { ErrorI, ERROR_500 } from "../types"

export const showError = (err: string): ErrorI => {
	return {
		type: ERROR_500,
		payload: err,
	}
}
