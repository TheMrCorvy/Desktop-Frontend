import React, { FC, useState, useEffect } from "react"

import { AccordionActions, Button, Divider } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Snackbar from "../Snackbar"

type Props = {
	locked: boolean
	visible: boolean
	textToCopy: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const CardFooter: FC<Props> = ({ locked, visible, textToCopy }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [copied, setCopied] = useState(false)

	const classes = useStyles()

	const copyToClipboard = () => {
		navigator.clipboard.writeText(textToCopy)

		setCopied(true)
	}

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

	if (!locked || visible) {
		return (
			<>
				<Divider />
				<AccordionActions>
					{visible && (
						<Button color="secondary" onClick={copyToClipboard}>
							{translate("actions", lng, 0)}
						</Button>
					)}

					{!locked && (
						<Button size="small" className={classes.btn}>
							{translate("actions", lng, 1)}
						</Button>
					)}
				</AccordionActions>

				{copied && (
					<Snackbar open={copied} message={translate("copy", lng)} duration={3500} />
				)}
			</>
		)
	} else {
		return null
	}
}

export default CardFooter
