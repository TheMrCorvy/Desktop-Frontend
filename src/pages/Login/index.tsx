import React, { FC, useState, ChangeEvent } from "react"
import { Link } from "react-router-dom"

import {
	Container,
	Grid,
	Typography,
	Button,
	Paper,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@material-ui/core"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: "33.33%",
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
		},
		centerAll: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
		},
		button: {
			textDecoration: "none",
		},
		title: {
			marginRight: 100,
		},
	})
)

const Login: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [expanded, setExpanded] = useState<string | false>(false)

	const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_not_found_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} md={6}>
					<Paper elevation={3}>
						<Typography gutterBottom paragraph variant="h4" className={classes.title}>
							Login
						</Typography>
						<Accordion
							expanded={expanded === "panel1"}
							onChange={handleChange("panel1")}
							elevation={0}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography className={classes.heading}>
									General settings
								</Typography>
								<Typography className={classes.secondaryHeading}>
									I am an accordion
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
									feugiat. Aliquam eget maximus est, id dignissim quam.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === "panel2"}
							onChange={handleChange("panel2")}
							elevation={0}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2bh-content"
								id="panel2bh-header"
							>
								<Typography className={classes.heading}>Users</Typography>
								<Typography className={classes.secondaryHeading}>
									You are currently not an owner
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Donec placerat, lectus sed mattis semper, neque lectus feugiat
									lectus, varius pulvinar diam eros in elit. Pellentesque
									convallis laoreet laoreet.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === "panel3"}
							onChange={handleChange("panel3")}
							elevation={0}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel3bh-content"
								id="panel3bh-header"
							>
								<Typography className={classes.heading}>
									Advanced settings
								</Typography>
								<Typography className={classes.secondaryHeading}>
									Filtering has been entirely disabled for whole web server
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
									Integer sit amet egestas eros, vitae egestas augue. Duis vel est
									augue.
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === "panel4"}
							onChange={handleChange("panel4")}
							elevation={0}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel4bh-content"
								id="panel4bh-header"
							>
								<Typography className={classes.heading}>Personal data</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
									Integer sit amet egestas eros, vitae egestas augue. Duis vel est
									augue.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Login
