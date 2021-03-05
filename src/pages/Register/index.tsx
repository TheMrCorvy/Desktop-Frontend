import React, { useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import {
	Grid,
	Container,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardActions,
} from "@material-ui/core"

import { Link } from "react-router-dom"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import DialogComponent from "../../components/Dialog"

import RegisterSteps from "../../components/Sections/RegisterSteps"

const tutorialSteps = [
	{
		label: "San Francisco – Oakland Bay Bridge, United States",
		imgPath:
			"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bird",
		imgPath:
			"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bali, Indonesia",
		imgPath:
			"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
	},
	{
		label: "NeONBRAND Digital Marketing, Las Vegas, United States",
		imgPath:
			"https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Goč, Serbia",
		imgPath:
			"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
	},
]

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
		},
		centerAll: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			textAlign: "center",

			[theme.breakpoints.up("sm")]: {
				marginTop: "1rem",
			},
		},
		card: {
			borderRadius: 7,
			marginTop: "1rem",
		},
		cardActions: {
			display: "flex",
			justifyContent: "space-between",
		},
		link: {
			textDecoration: "none",
		},
		cardSubheader: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
			textAlign: "center",
		},
		cardHeader: {
			textAlign: "center",
		},
		dialogButton: {
			boxShadow: "none",
			marginBottom: "2rem",
		},
	})
)

export default function TextMobileStepper() {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_not_found_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} sm={8} md={7}>
					<Card className={classes.card}>
						<CardHeader
							title={translate("navbar_register_btn", lng)}
							subheader="Por favor asegurese de tener instalada una app para generar códigos de verificación. Haz click en el símbolo de pregunta para saber más al respecto."
							classes={{
								subheader: classes.cardSubheader,
								title: classes.cardHeader,
							}}
							subheaderTypographyProps={{ variant: "body2" }}
						/>
						<CardContent>
							<DialogComponent
								title={translate("about_subtitle", lng)}
								tooltipPlacement="top"
								className={classes.dialogButton}
							>
								<>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
									nisi, suscipit maxime eaque rem quasi doloremque omnis tempora
									natus voluptate dolore officia repellat odio dignissimos ab
									nostrum earum magnam qui.
								</>
							</DialogComponent>
							<RegisterSteps />
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Link to="/" className={classes.link}>
								<Button size="large" color="primary">
									{translate("home", lng)}
								</Button>
							</Link>
							<Link to="/login" className={classes.link}>
								<Button size="large" color="primary">
									{translate("navbar_login_btn", lng)}
								</Button>
							</Link>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}
