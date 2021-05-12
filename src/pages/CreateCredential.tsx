import React, { FC } from "react"

import {
	Container,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			minHeight: "100vh",
			paddingTop: "5.5rem",
			paddingBottom: "5.5rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
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
		textColor: {
			color: theme.palette.type === "dark" ? "white" : "black",
		},
	})
)

const CreateCredential: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container justify="space-between">
					<Grid item xs={12} md={6} lg={4}>
						<Accordion defaultExpanded style={{ borderRadius: 8 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
									<Typography className={classes.heading}>'label'</Typography>
								</div>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="label"
									variant="outlined"
									fullWidth
									className={classes.textColor}
									InputProps={{
										classes: {
											input: classes.textColor,
										},
									}}
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default CreateCredential
