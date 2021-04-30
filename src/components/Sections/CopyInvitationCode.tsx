import React, { FC, useState, useEffect } from "react"

import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	TextField,
} from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Snackbar from "../Snackbar"

type Props = {
	code: string
}

const CopyInvitationCode: FC<Props> = ({ code }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(() => {
				setCopied(false)
			}, 4000)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [copied])

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code)

		setCopied(true)
	}

	return (
		<>
			<Card style={{ borderRadius: 8 }}>
				<CardActionArea onClick={copyToClipboard}>
					<CardHeader title={translate("invitation_code", lng)} />
					<CardContent>
						<TextField variant="filled" disabled defaultValue={code} />
					</CardContent>
					<CardActions
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<Button color="secondary">{translate("click_to_copy", lng)}</Button>
					</CardActions>
				</CardActionArea>
			</Card>
			{copied && <Snackbar open={copied} message={translate("copy", lng)} duration={3500} />}
		</>
	)
}

export default CopyInvitationCode
