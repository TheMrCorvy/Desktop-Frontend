import React, { FC } from "react"

import LandingWelcome from "../components/Sections/LandingWelcome/index"
import Downloads from "../components/Sections/Downloads/index"
import About from "../components/Sections/About"
import Pricing from "../components/Sections/Pricing"
import Feedback from "../components/Sections/Feedback"

import { Container, Grid, Tooltip, IconButton, Typography, Link } from "@material-ui/core"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { grey } from "@material-ui/core/colors"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"
import TranslateButton from "../components/Navbar/NavbarComponents/NavbarButtons/TranslateButton"

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		background: grey[900],
		minHeight: "30vh",
		color: "white",
	},
	container: {
		paddingTop: "3rem",
		paddingBottom: "6rem",
	},
	textCenter: {
		textAlign: "center",
	},
})

const Landing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<>
			<LandingWelcome />
			<Downloads />
			<About />
			<Feedback />
			<Pricing />
			<div className={classes.root}>
				<Container maxWidth="xl" className={classes.container}>
					<Grid container justify="space-around" spacing={4}>
						<Grid item xs={12} sm={1} className={classes.textCenter}>
							<Tooltip title={translate("home", lng)}>
								<Link href="/" color="inherit">
									<IconButton edge="start" color="inherit" aria-label="logo">
										<FontAwesomeIcon icon={["fas", "key"]} size="2x" />
									</IconButton>
								</Link>
							</Tooltip>
						</Grid>
						<Grid item xs={12} sm={11} md={9}>
							<Typography variant="body2" gutterBottom paragraph>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Necessitatibus suscipit beatae non, animi totam quas deserunt libero
								dolorum voluptas molestias numquam excepturi, sint alias neque?
								Exercitationem eos officiis deleniti consectetur?
							</Typography>
							<Typography variant="body2" gutterBottom paragraph>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Necessitatibus suscipit beatae non, animi totam quas deserunt libero
								dolorum voluptas molestias numquam excepturi, sint alias neque?
								Exercitationem eos officiis deleniti consectetur?
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={2} className={classes.textCenter}>
							<Grid container justify="space-between" spacing={2}>
								<Grid item xs={3} md={12}>
									<Link href="/" color="inherit">
										{translate("downloads", lng)}
									</Link>
								</Grid>
								<Grid item xs={3} md={12}>
									<Link href="/login" color="inherit">
										{translate("navbar_login_btn", lng)}
									</Link>
								</Grid>
								<Grid item xs={3} md={12}>
									<Link href="/register" color="inherit">
										{translate("navbar_register_btn", lng)}
									</Link>
								</Grid>
								<Grid item xs={3} md={12}>
									<TranslateButton style={{ padding: 0 }} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	)
}

export default Landing
