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
	Typography,
	DialogContent,
	Divider,
	Link as MuiLink,
} from "@material-ui/core"

import { Link } from "react-router-dom"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import DialogComponent from "../../components/Dialog"

import RegisterSteps from "../../components/Sections/RegisterSteps"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			paddingTop: "1rem",
			paddingBottom: "1rem",
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
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
		recommendedLinks: {
			marginRight: 15,
			color: "#ff6200",
		},
	})
)

export default function TextMobileStepper() {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const recommendedApps = [
		{
			appName: "Microsoft Authenticator",
			bodyText: translate("recommended_apps_texts", lng, 0),
			linkAppleStore: "https://apps.apple.com/es/app/microsoft-authenticator/id983156458",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=es_AR&gl=US",
		},
		{
			appName: "Google Authenticator",
			bodyText: translate("recommended_apps_texts", lng, 1),
			linkAppleStore: "https://apps.apple.com/es/app/google-authenticator/id388497605",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es_AR&gl=US",
		},
		{
			appName: "Twilio Authy",
			bodyText: translate("recommended_apps_texts", lng, 2),
			linkAppleStore: "https://apps.apple.com/us/app/twilio-authy/id494168017",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.authy.authy&hl=es_AR&gl=US",
		},
	]

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_register_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} sm={8} md={7}>
					<Card className={classes.card}>
						<CardHeader
							title={translate("navbar_register_btn", lng)}
							subheader={translate("install_app_to_generate_codes", lng)}
							classes={{
								subheader: classes.cardSubheader,
								title: classes.cardHeader,
							}}
							subheaderTypographyProps={{ variant: "body2" }}
						/>
						<CardContent>
							<DialogComponent
								title={translate("register_dialog_texts", lng, 0)}
								tooltipPlacement="top"
								className={classes.dialogButton}
							>
								<DialogContent>
									<Typography paragraph gutterBottom variant="body2">
										{translate("register_dialog_texts", lng, 1)}
									</Typography>
									<Typography paragraph gutterBottom variant="body2">
										{translate("register_dialog_texts", lng, 2)}
									</Typography>
									<Divider className={classes.divider} />
									<Typography paragraph gutterBottom variant="body2">
										{translate("register_dialog_texts", lng, 3)}
									</Typography>
									<Typography paragraph gutterBottom variant="body2">
										{translate("register_dialog_texts", lng, 4)}
									</Typography>
									<Divider className={classes.divider} />
									<Typography paragraph gutterBottom variant="body2">
										{translate("register_dialog_texts", lng, 5)}
									</Typography>
									<ol>
										{recommendedApps.map((app, index) => (
											<li key={index} style={{ marginBottom: 25 }}>
												<Typography variant="h6" gutterBottom>
													{app.appName}
												</Typography>
												<Typography paragraph gutterBottom variant="body2">
													{app.bodyText}
												</Typography>
												<MuiLink
													className={classes.recommendedLinks}
													href={app.linkPlayStore}
													target="_blank"
												>
													Google PlayStore
												</MuiLink>
												<MuiLink
													className={classes.recommendedLinks}
													href={app.linkAppleStore}
													target="_blank"
												>
													Apple AppStore
												</MuiLink>
											</li>
										))}
									</ol>
								</DialogContent>
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
