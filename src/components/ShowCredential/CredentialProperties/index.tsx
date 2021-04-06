import React, { useEffect, useState } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import CardFooter from "../CardFooter"

type Props = {
	locked: boolean
	visible: boolean
	label: string
	opening: string
	ending: string
	char_count: number | null
	body?: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordion: {
			width: "100%",
			borderRadius: 8,
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		column: {
			flexBasis: "100%",
		},
	})
)

const CredentialProperties = ({
	locked,
	visible,
	label,
	opening,
	char_count,
	ending,
	body,
}: Props) => {
	const classes = useStyles()

	const [showProp, setShowProp] = useState("")

	useEffect(() => {
		if ((!locked && body) || (visible && body)) {
			setShowProp(body)
		} else {
			const charCount = char_count ? char_count + 1 : 0

			const asterisks = new Array(charCount).join("•")

			const encryptedEmail = opening + asterisks + ending

			setShowProp(encryptedEmail)
		}
	}, [locked, visible])

	const handleChange = (event: any) => {
		setShowProp(event.target.value)
	}

	return (
		<Accordion defaultExpanded style={{ borderRadius: 8 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={classes.column}>
					<Typography className={classes.heading}>{label}</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					label={label}
					variant="outlined"
					disabled={locked}
					value={showProp}
					onChange={handleChange}
					fullWidth
				/>
			</AccordionDetails>
			<CardFooter locked={locked} visible={visible} />
		</Accordion>
	)
}

export default CredentialProperties
