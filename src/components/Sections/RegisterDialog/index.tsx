import { FC } from "react"

import { Typography, DialogContent, Divider, Link } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import DialogComponent from "../../Dialog"

import { recommendedTwoFactorApps } from "../../../misc/staticData"
import { RecommendedAppsT } from "../../../misc/types"

const RegisterDialog: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const recommendedApps: RecommendedAppsT[] = recommendedTwoFactorApps(lng)

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
