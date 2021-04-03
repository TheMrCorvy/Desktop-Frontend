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
	email: {
		opening: string
		char_count: number
		ending: string
		email?: string
	}
	locked: boolean
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

const EmailCredential = ({ email, locked }: Props) => {
	const classes = useStyles()

	const [showEmail, setShowEmail] = useState("")

	useEffect(() => {
		if (!locked && email.email) {
			setShowEmail(email.email)
		} else {
			const asterisks = new Array(email.char_count).join("•")

			const encryptedEmail = email.opening + asterisks + email.ending

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
					<Typography className={classes.secondaryHeading}>
						See the email for this credential
					</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					label="Email"
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

export default EmailCredential
