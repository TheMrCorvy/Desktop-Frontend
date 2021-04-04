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
	Grid,
	Chip,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

type Props = {
	locked: boolean
	label: string
	body: string[]
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

const CredentialCodes = ({ locked, label, body }: Props) => {
	const classes = useStyles()

	const [showCodes, setShowCodes] = useState<string[]>([""])

	useEffect(() => {
		if (!locked && body) {
			setShowCodes(body)
		} else {
			setShowCodes(["•••••"])
		}
	}, [locked])

	const handleChange = (event: any) => {
		// setShowProp(event.target.value)
	}

	return (
		<Accordion defaultExpanded style={{ borderRadius: 8 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={classes.column}>
					<Typography className={classes.heading}>{label}</Typography>
				</div>
				<div className={classes.column}>
					<Typography className={classes.secondaryHeading}>See {label}</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={4}>
					{showCodes.map((code) => (
						<Chip
							icon={locked ? <LockIcon /> : <LockOpenIcon />}
							key={code}
							label={code}
							color="primary"
							disabled={locked}
						/>
					))}
				</Grid>
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

export default CredentialCodes
