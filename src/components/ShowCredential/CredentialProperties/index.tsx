import React, { useEffect, useState } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AccordionActions,
	Button,
	Divider,
	TextField,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

type Props = {
	locked: boolean
	label: string
	subTitle: string
	opening: string
	char_count: number
	ending: string
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
			flexBasis: "40%",
		},
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const CredentialProperties = ({
	locked,
	label,
	subTitle,
	opening,
	char_count,
	ending,
	body,
}: Props) => {
	const classes = useStyles()

	const [showEmail, setShowEmail] = useState("")

	useEffect(() => {
		if (!locked && body) {
			setShowEmail(body)
		} else {
			const asterisks = new Array(char_count).join("•")

			const encryptedEmail = opening + asterisks + ending

			setShowEmail(encryptedEmail)
		}
	})

	const handleChange = (event: any) => {
		setShowEmail(event.target.value)
	}

	return (
		<Accordion defaultExpanded style={{ borderRadius: 8 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={classes.column}>
					<Typography className={classes.heading}>Email</Typography>
				</div>
				<div className={classes.column}>
					<Typography className={classes.secondaryHeading}>{subTitle}</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					label={label}
					variant="outlined"
					disabled={locked}
					value={showEmail}
					onChange={handleChange}
					fullWidth
				/>
			</AccordionDetails>
			<Divider />
			{!locked && (
				<AccordionActions>
					<Button size="small" className={classes.btn}>
						Remove
					</Button>
				</AccordionActions>
			)}
		</Accordion>
	)
}

export default CredentialProperties
