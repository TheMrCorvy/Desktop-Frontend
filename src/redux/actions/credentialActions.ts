import { CLEAR_CREDENTIAL, EditCredentialI, EDIT_CREDENTIAL } from "../types"

import {
	AccessCredentialPropT,
	CredentialPropValueT,
	CredentialT,
	ReduxCredentialT,
} from "../../misc/types"

type CredentialProp = {
	oldCredential: ReduxCredentialT
	prop: AccessCredentialPropT
	newValue: CredentialPropValueT
}
// I'll use edit credential to manage the writing on the inputs, either for editing or creating a new one
export const editCredential = (editing: CredentialProp): EditCredentialI => {
	return {
		type: EDIT_CREDENTIAL,
		payload: { ...editing.oldCredential, [editing.prop]: editing.newValue },
	}
}

// This action will be called when entering the create credential view
export const clearCredential = (): EditCredentialI => {
	return {
		type: CLEAR_CREDENTIAL,
		payload: {},
	}
}

export const initializeCredential = (credentialDB: CredentialT): EditCredentialI => {
	let initialC: ReduxCredentialT = {}

	let asterisks: string

	if (credentialDB.description) {
		initialC.description = credentialDB.description
	}
	if (credentialDB.email) {
		/** */

		asterisks = calcAsterisks(credentialDB.email.char_count)

		initialC.email = credentialDB.email.opening + asterisks + credentialDB.email.ending
	}
	if (credentialDB.password) {
		/** */

		asterisks = calcAsterisks(credentialDB.password.char_count)

		initialC.password = asterisks
	}
	if (credentialDB.phone_number) {
		/** */

		asterisks = calcAsterisks(credentialDB.phone_number.char_count)

		initialC.phone_number =
			credentialDB.phone_number.ending + asterisks + credentialDB.phone_number.ending
	}
	if (credentialDB.security_codes) {
		/** */

		if (credentialDB.security_codes.crypto_currency_access_code) {
			/** */

			initialC.crypto_currency_access_codes = createCodesArr(
				credentialDB.security_codes.crypto_code_length
			)
		}
		if (credentialDB.security_codes.multiple_security_codes) {
			/** */

			initialC.multiple_security_code = createCodesArr(
				credentialDB.security_codes.multiple_code_length
			)
		}
		if (credentialDB.security_codes.unique_security_code) {
			/** */

			initialC.unique_security_code = calcAsterisks(10)
		}
	}
	if (credentialDB.security_question_answer) {
		/** */

		initialC.security_question = calcAsterisks(10)

		initialC.security_answer = calcAsterisks(10)
	}
	if (credentialDB.user_name && credentialDB.char_count) {
		/** */

		asterisks = calcAsterisks(credentialDB.char_count)

		initialC.user_name = asterisks
	}
	if (credentialDB.username) {
		initialC.username = calcAsterisks(credentialDB.username.char_count)
	}

	return {
		type: CLEAR_CREDENTIAL,
		payload: initialC,
	}
}

const calcAsterisks = (charCount: number): string => {
	return new Array(charCount).join("•")
}

const createCodesArr = (arrLength: number | null) => {
	return Array.from(new Array(arrLength), () => "•••••")
}

/* acá viene otra acción más que va a setear los valores de la credencial que vengan de la api.
cuando el usuario desbloquee o visualice la credencial, se despacha "clearCredential", y despues se despacha tambien la
4ta action que pone los datos desencriptados que devolvió la api, en el estado global
*/
