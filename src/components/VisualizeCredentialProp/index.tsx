import React, { FC, useState, useEffect } from "react"

import { AccessCredentialPropT } from "../../misc/types"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

type Props = {
	label: string
	locked: boolean
	visible: boolean
	propName: AccessCredentialPropT
	isCrypto?: boolean
	maxChar?: number
}

type ValuePossibleStates = string | number | string[] | null | undefined

const VisualizeCredentialProp: FC<Props> = (props) => {
	const { label, locked, visible, propName, isCrypto, maxChar } = props

	const { credential } = useSelector((state: RootState) => state.credential)

	const [mainValue, setMainValue] = useState<ValuePossibleStates>("")

	const [secondValue, setSecondValue] = useState<ValuePossibleStates>("")

	const [credCodes, setCredCodes] = useState<ValuePossibleStates>([""])

	const [mainMaxChar, setMainMaxChar] = useState(0)

	const [secondMaxchar, setSecondMaxChar] = useState(0)

	useEffect(() => {
		if (propName === "security_question") {
			setMainValue(credential.security_question)

			setSecondValue(credential.security_answer)
		} else if (
			propName === "crypto_currency_access_codes" ||
			propName === "multiple_security_code"
		) {
			setCredCodes(credential[propName])
		} else {
			setMainValue(credential[propName])
		}

		if (maxChar) {
			setMainMaxChar(maxChar)
			setSecondMaxChar(maxChar)
		}
	}, [credential])

	const selectInputType = () => {
		if (propName === "description") {
			return "multiline"
		}

		if (propName === "multiple_security_code" || propName === "crypto_currency_access_codes") {
			return "multiple codes"
		}

		if (propName === "security_answer" || propName === "security_question") {
			return "sqa"
		}

		return "text field"
	}

	return <>{selectInputType}</>
}

export default VisualizeCredentialProp
