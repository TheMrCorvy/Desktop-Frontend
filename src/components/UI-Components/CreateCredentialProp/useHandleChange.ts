import { useState, useEffect, ChangeEvent } from "react"
import { AccessCredentialPropT } from "../../../misc/types"

const useHandleChange = ({ accessCredentialProp, editCredentialProp }: Params) => {
	const [mainCharCount, setMainCharCount] = useState(0)
	const [secondCharCount, setSecondCharCount] = useState(0)
	const [mainText, setMainText] = useState("")
	const [secondText, setSecondText] = useState("")
	const [editingOption, setEditingOption] = useState<"question" | "answer" | "">("")

	useEffect(() => {
		const edits: ExportEdits = {
			mainText,
			secondText,
			accessCredentialProp,
			editingOption,
		}

		editCredentialProp(edits)
	}, [mainText, secondText])

	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		const target = event.target as HTMLInputElement
		const inputType = target.getAttribute("type")
		const variant = target.getAttribute("variant")

		switch (inputType) {
			case "text field":
				setMainText(target.value)

				setMainCharCount(target.value.length)
				break

			case "select option":
				setMainText(target.value)

				setMainCharCount(target.value.length)
				break

			case "multiline":
				setMainText(target.value)

				setMainCharCount(target.value.length)
				break

			case "sqa":
				if (variant && variant === "security question") {
					setMainText(target.value)

					setMainCharCount(target.value.length)

					setEditingOption("question")
				}

				if (variant && variant === "security answer") {
					setSecondText(target.value)

					setSecondCharCount(target.value.length)

					setEditingOption("answer")
				}

				break

			default:
				break
		}
	}

	return {
		handleChange,
		mainCharCount,
		secondCharCount,
		mainText,
		secondText,
	}
}

type Params = {
	accessCredentialProp: AccessCredentialPropT
	editCredentialProp: (edits: ExportEdits) => void
}

type ExportEdits = {
	mainText: string
	secondText: string
	accessCredentialProp: AccessCredentialPropT
	editingOption: "question" | "answer" | ""
}

export default useHandleChange
