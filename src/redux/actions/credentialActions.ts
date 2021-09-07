import {
	CLEAR_CREDENTIAL,
	DELETE_CREDENTIAL_PROPERTY,
	EditCredentialI,
	EDIT_CREDENTIAL,
} from "../types"

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

export const removeCredentialProp = (
	oldCredential: ReduxCredentialT,
	propName: AccessCredentialPropT
) => {
	let newCredential: ReduxCredentialT = {
		id: oldCredential.id,
		user_id: oldCredential.user_id,
		company_id: oldCredential.company_id,
		company_name: oldCredential.company_name,
		description: oldCredential.description,
		created_at: oldCredential.created_at,
		updated_at: oldCredential.updated_at,
		last_seen: oldCredential.last_seen,
	}

	if (propName !== "user_name") {
		newCredential.user_name = oldCredential.user_name
	}
	if (propName !== "email") {
		newCredential.email = oldCredential.email
	}
	if (propName !== "password") {
		newCredential.password = oldCredential.password
	}
	if (propName !== "username") {
		newCredential.username = oldCredential.username
	}
	if (propName !== "phone_number") {
		newCredential.phone_number = oldCredential.phone_number
	}
	if (propName !== "security_question") {
		newCredential.security_question = oldCredential.security_question
	}
	if (propName !== "security_answer") {
		newCredential.security_answer = oldCredential.security_answer
	}
	if (propName !== "unique_security_code") {
		newCredential.unique_security_code = oldCredential.unique_security_code
	}
	if (propName !== "multiple_security_code") {
		newCredential.multiple_security_code = oldCredential.multiple_security_code
	}
	if (propName !== "crypto_currency_access_codes") {
		newCredential.crypto_currency_access_codes = oldCredential.crypto_currency_access_codes
	}

	return {
		type: DELETE_CREDENTIAL_PROPERTY,
		payload: newCredential,
	}
}

// this action is used to manage the writing on the inputs, either for editing or creating a new one
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
	return new Array(++charCount).join("•")
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
			const stringArr = credentialApi.security_codes.multiple_security_codes.match(
				/\S+/g
			) as string[]

			decryptedCred.multiple_security_code = stringArr
		}

		if (credentialApi.security_codes.crypto_currency_access_code) {
			const stringArr = credentialApi.security_codes.crypto_currency_access_code.match(
				/\S+/g
			) as string[]

			decryptedCred.crypto_currency_access_codes = stringArr
		}
	}

	return {
		type: CLEAR_CREDENTIAL,
		payload: decryptedCred,
	}
}
