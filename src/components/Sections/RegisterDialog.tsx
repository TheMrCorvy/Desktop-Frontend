import React, { FC } from "react"

import { Typography, DialogContent, Divider, Link } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import DialogComponent from "../Dialog"

const useStyles = makeStyles({
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

const RegisterDialog: FC = () => {
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
							<Link
								className={classes.recommendedLinks}
								href={app.linkPlayStore}
								target="_blank"
							>
								Google PlayStore
							</Link>
							<Link
								className={classes.recommendedLinks}
								href={app.linkAppleStore}
								target="_blank"
							>
								Apple AppStore
							</Link>
						</li>
					))}
				</ol>
			</DialogContent>
		</DialogComponent>
	)
}

export default RegisterDialog
