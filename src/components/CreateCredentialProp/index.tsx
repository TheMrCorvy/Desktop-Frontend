import React, { FC, useState } from "react"

type Props = {
	layout: "text field" | "select option" | "multiline" | "multiple code"
	label: string
	maxChar?: number
}

const CreateCredentialProp: FC<Props> = ({ layout, label, maxChar }) => {
	const [charCount, setCharCount] = useState(0)

	switch (layout) {
		case "text field":
			return (
				<>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, corrupti!
					Autem ducimus cupiditate vero obcaecati omnis ab eveniet placeat culpa rerum
					dolorem accusantium, vel impedit, labore quibusdam quo ex deserunt.
				</>
			)
		case "select option":
			return (
				<>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, corrupti!
					Autem ducimus cupiditate vero obcaecati omnis ab eveniet placeat culpa rerum
					dolorem accusantium, vel impedit, labore quibusdam quo ex deserunt.
				</>
			)
		case "multiline":
			return (
				<>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, corrupti!
					Autem ducimus cupiditate vero obcaecati omnis ab eveniet placeat culpa rerum
					dolorem accusantium, vel impedit, labore quibusdam quo ex deserunt.
				</>
			)
		case "multiple code":
			return (
				<>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, corrupti!
					Autem ducimus cupiditate vero obcaecati omnis ab eveniet placeat culpa rerum
					dolorem accusantium, vel impedit, labore quibusdam quo ex deserunt.
				</>
			)

		default:
			return null
	}
}

export default CreateCredentialProp
