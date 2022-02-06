import { useState, useEffect } from "react"

import { Dispatch } from "redux"
import { editCredential } from "../../../redux/actions/credentialActions"

import { AccessCredentialPropT, CredentialPropValueT, ReduxCredentialT } from "../../../misc/types"

const useEditcodes = ({ credential, dispatch, codes, isCrypto }: Params) => {
	const [editingCodes, setEditingCodes] = useState<string[]>(codes)

	useEffect(() => {
		let baggage: Baggage = {
			oldCredential: credential,
			newValue: editingCodes,
			prop: "multiple_codes",
		}

		if (isCrypto) {
			baggage.prop = "crypto_codes"
		}

		dispatch(editCredential(baggage))
	}, [editingCodes])

	const removeCode = (code: string) => {
		const editedArray: string[] = []

		editingCodes.forEach((codeValue) => {
			if (codeValue !== code) {
				editedArray.push(codeValue)
			}
		})

		setEditingCodes(editedArray)
	}

	return { editingCodes, setEditingCodes, removeCode }
}

type Params = {
	credential: ReduxCredentialT
	dispatch: Dispatch
	codes: string[]
	isCrypto?: boolean
}

type Baggage = {
	oldCredential: ReduxCredentialT
	prop: AccessCredentialPropT
	newValue: CredentialPropValueT
}

export default useEditcodes
