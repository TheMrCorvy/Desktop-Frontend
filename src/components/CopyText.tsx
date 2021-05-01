import React, { FC, ReactElement, useState, useEffect } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import Snackbar from "./Snackbar"

type Props = {
	body: string
	children: ReactElement
	duration?: number
}

const CopyText: FC<Props> = ({ children, body, duration }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(
				() => {
					setCopied(false)
				},
				duration ? duration + 500 : 4000
			)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [copied])

	const copyTextToClipboard = () => {
		navigator.clipboard.writeText(body)

		setCopied(true)
	}

	return (
		<>
			<div onClick={copyTextToClipboard}>{children}</div>
			{copied && (
				<Snackbar
					open={copied}
					message={translate("copy", lng)}
					duration={duration ? duration : 3500}
				/>
			)}
		</>
	)
}

export default CopyText
