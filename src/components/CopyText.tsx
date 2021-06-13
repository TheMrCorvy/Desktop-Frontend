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

/**
 * @component
 *
 * @alias CopyText
 *
 * @description This component will receive 3 main things
 *
 * @param {string} body text for cpy
 * @param {ReactElement} children call to action
 * @param {number} [duration] the duration of the snackbar in milliseconds
 *
 * @example
 * <CopyText body="some text" duration={30000}>
 * 		<button>copy</button>
 * </CopyText>
 */

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
