import React from "react"

interface PropsI {
	text: string
}

const Button = ({ text }: PropsI) => {
	return <button data-testid="button">{text}</button>
}

export default Button
