import React from "react"

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
	useMediaQuery,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

type Props = {
	locked: boolean
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

const CredentialCodes = ({ locked, label, body, isCrypto }: Props) => {
	const classes = useStyles()

	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down("sm"))

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
								label={isCrypto && !locked ? index + 1 + ") " + code : code}
								color="secondary"
								disabled={locked}
								size={matches ? "small" : "medium"}
							/>
						</Grid>
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
