import React, { FC, useState, ChangeEvent } from "react"
import { Link } from "react-router-dom"

import {
	Container,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Button,
	Paper,
	Tab,
	Tabs,
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
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
		},
		centerAll: {
			minHeight: "100vh",

			[theme.breakpoints.down("sm")]: {
				marginTop: "4rem",
			},
			[theme.breakpoints.up("md")]: {
				display: "flex",
				alignItems: "center",
			},
		},
		button: {
			textDecoration: "none",
		},
		title: {
			marginRight: 100,
		},
		card: {
			borderRadius: 7,
		},
		cardActions: {
			display: "flex",
			justifyContent: "flex-end",
		},
		link: {
			textDecoration: "none",
		},
	})
)

const Login: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	// const [expanded, setExpanded] = useState<string | false>("panel1")

	// const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
	// 	setExpanded(isExpanded ? panel : false)
	// }

	const [value, setValue] = useState(0)

	const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_not_found_page">
			<Grid container justify="space-around" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} md={6}>
					<Card className={classes.card} elevation={2}>
						{/* <CardHeader title={translate("login_title", lng)} /> */}
						<CardContent>
							{/* <Accordion
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
										{translate("login_options", lng, 0)}
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
									<Typography className={classes.heading}>
										{translate("login_options", lng, 1)}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Donec placerat, lectus sed mattis semper, neque lectus
										feugiat lectus, varius pulvinar diam eros in elit.
										Pellentesque convallis laoreet laoreet.
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
										{translate("login_options", lng, 2)}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
										Integer sit amet egestas eros, vitae egestas augue. Duis vel
										est augue.
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
									<Typography className={classes.heading}>
										{translate("login_options", lng, 3)}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
										Integer sit amet egestas eros, vitae egestas augue. Duis vel
										est augue.
									</Typography>
								</AccordionDetails>
							</Accordion> */}
							{/* <Paper square> */}
							<Tabs
								value={value}
								indicatorColor={theme === "dark" ? "primary" : "secondary"}
								textColor={theme === "dark" ? "primary" : "secondary"}
								onChange={handleChange}
								aria-label="disabled tabs example"
								variant="scrollable"
								scrollButtons="off"
							>
								<Tab label="Active" />
								<Tab label="Disabled" disabled />
								<Tab label="Active 2" />
								<Tab label="Active 3" />
							</Tabs>
							{/* </Paper> */}
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Link to="/register" className={classes.link}>
								<Button size="large" color="primary">
									{translate("navbar_register_btn", lng)}
								</Button>
							</Link>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Login
