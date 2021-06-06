import React, { FC, useState, useEffect } from "react"

import { AccessCredentialPropT } from "../../misc/types"

type Props = {
	label: string
	locked: boolean
	visible: boolean
	opening: string
	char_count: number
	ending: string
	propName: AccessCredentialPropT
	codes?: string[]
	isCrypto?: boolean
	sqa?: {
		q: string
		a: string
	}
	maxChar?: number
}

const VisualizeCredentialProp: FC<Props> = (props) => {
	const {
		label,
		locked,
		visible,
		opening,
		char_count,
		ending,
		propName,
		codes,
		isCrypto,
		sqa,
		maxChar,
	} = props

	const [mainValue, setMainValue] = useState("")

	const [secondValue, setSecondValue] = useState("")

	const [credCodes, setCredCodes] = useState<string[]>([""])

	const [mainMaxChar, setMainMaxChar] = useState(0)

	const [secondMaxchar, setSecondMaxChar] = useState(0)

	useEffect(() => {
		if (codes) {
			setCredCodes(codes)
		}
	}, [])

	useEffect(() => {
		if (locked || !visible) {
			setLockedValues()
		} else {
			setUnlockedValues()
		}
	}, [locked, visible])

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

	const setLockedValues = () => {
		if (propName !== "description") {
			const body = new Array(char_count).join("•")

			setMainValue(opening + body + ending)
			setSecondValue(opening + body + ending)

			if (codes) {
				const lockedCodes = [...Array(codes.length)].map(() => "•••••")

				setCredCodes(lockedCodes)
			}
		} else {
			//set value from redux state
		}
	}
const setUnlockedValues = () => {
		//take the values from redux
        
	}

	return <>{selectInputType}</>
}

export default VisualizeCredentialProp
