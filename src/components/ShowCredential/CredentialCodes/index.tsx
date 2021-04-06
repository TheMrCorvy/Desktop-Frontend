import React from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Chip,
	useMediaQuery,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import CardFooter from "../CardFooter"

type Props = {
	locked: boolean
	visible: boolean
	label: string
	body: string[]
	isCrypto?: boolean
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
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const CredentialCodes = ({ locked, visible, label, body, isCrypto }: Props) => {
	const classes = useStyles()

	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down("sm"))

	const showLabel = (number: number, code: string) => {
		if ((isCrypto && visible) || (isCrypto && !locked)) {
			return number + 1 + ") " + code
		} else {
			return code
		}
	}

	return (
		<Accordion defaultExpanded style={{ borderRadius: 8 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={classes.column}>
					<Typography className={classes.heading}>{label}</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={4} justify="space-around">
					{body.map((code: string, index: number) => (
						<Grid item key={index}>
							<Chip
								icon={locked ? <LockIcon /> : <LockOpenIcon />}
								key={code}
								label={showLabel(index, code)}
								color="secondary"
								disabled={!visible}
								size={matches ? "small" : "medium"}
							/>
						</Grid>
					))}
				</Grid>
			</AccordionDetails>
			<CardFooter locked={locked} visible={visible} />
		</Accordion>
	)
}

export default CredentialCodes
