import React, { FC, useState, useEffect } from "react"

import {
	Container,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AccordionActions,
	Button,
	Divider,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { findCredential } from "../misc/indexedDB"

import UnlockData from "../components/UnlockData"

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
			flexBasis: "33.33%",
		},
		container: {
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			minHeight: "100vh",
			paddingTop: "7rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
		title: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
		},
		lockIcon: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
		},
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const ViewCredential: FC = (props: any) => {
	const classes = useStyles()

	const [locked, setLocked] = useState(true)

	useEffect(() => {
		// since the url param is a string, we have to transform it into a number
		const id = Number(props.match.params.credentialId)

		findCredential(id + 1).then((algo) => console.log(algo))
	}, [])

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="space-between" spacing={4}>
				<Grid item xs={10} sm={11} className={classes.title}>
					<Typography variant="h6">Nombre de la empresa</Typography>
				</Grid>
				<Grid item xs={2} sm={1} className={classes.lockIcon}>
					<UnlockData toggleLock={() => setLocked(!locked)} locked={locked} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Accordion defaultExpanded style={{ borderRadius: 8 }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<div className={classes.column}>
								<Typography className={classes.heading}>Location</Typography>
							</div>
							<div className={classes.column}>
								<Typography className={classes.secondaryHeading}>
									Select trip destination
								</Typography>
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
								possimus numquam, sed doloribus, incidunt itaque vero exercitationem
								adipisci, suscipit alias vitae. Perferendis accusamus qui voluptatum
								cum doloremque, vitae molestias excepturi.
							</Typography>
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
				</Grid>
			</Grid>
		</Container>
	)
}

export default ViewCredential
