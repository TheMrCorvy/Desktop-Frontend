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

	initialC.id = credentialDB.id
	initialC.user_id = credentialDB.user_id
	initialC.company_name = credentialDB.company_name
	initialC.company_id = credentialDB.company_id
	initialC.created_at = credentialDB.created_at
	initialC.updated_at = credentialDB.updated_at
	initialC.last_seen = credentialDB.last_seen

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
			credentialDB.phone_number.opening + asterisks + credentialDB.phone_number.ending
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

export const setDecryptedCredential = (credentialApi: CredentialT): EditCredentialI => {
	let decryptedCred: ReduxCredentialT = {}

	decryptedCred.id = credentialApi.id
	decryptedCred.user_id = credentialApi.user_id
	decryptedCred.company_name = credentialApi.company_name
	decryptedCred.company_id = credentialApi.company_id
	decryptedCred.created_at = credentialApi.created_at
	decryptedCred.updated_at = credentialApi.updated_at
	decryptedCred.last_seen = credentialApi.last_seen

	if (credentialApi.description) {
		decryptedCred.description = credentialApi.description
	}

	if (credentialApi.user_name) {
		decryptedCred.user_name = credentialApi.user_name
	}

	if (credentialApi.email) {
		decryptedCred.email = credentialApi.email.email
	}

	if (credentialApi.password) {
		decryptedCred.password = credentialApi.password.password
	}

	if (credentialApi.username) {
		decryptedCred.username = credentialApi.username.username
	}

	if (credentialApi.phone_number) {
		decryptedCred.phone_number = credentialApi.phone_number.phone_number
	}

	if (credentialApi.security_question_answer) {
		decryptedCred.security_answer = credentialApi.security_question_answer.security_answer
		decryptedCred.security_question = credentialApi.security_question_answer.security_question
	}

	if (credentialApi.security_codes) {
		if (credentialApi.security_codes.unique_security_code) {
			decryptedCred.unique_security_code = credentialApi.security_codes.unique_security_code
		}

		if (credentialApi.security_codes.multiple_security_codes) {
			decryptedCred.multiple_security_code =
				credentialApi.security_codes.multiple_security_codes
		}

		if (credentialApi.security_codes.crypto_currency_access_code) {
			decryptedCred.crypto_currency_access_codes =
				credentialApi.security_codes.crypto_currency_access_code
		}
	}

	return {
		type: CLEAR_CREDENTIAL,
		payload: decryptedCred,
	}
}
