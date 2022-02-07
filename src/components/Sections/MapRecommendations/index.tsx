import { FC } from "react"

import { Grid, Typography, Link } from "@material-ui/core"
import useStyles from "./styles"

import { RecommendedAppsT } from "../../../misc/types"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

const MapRecommendations: FC<Props> = ({ apps }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<ul>
			{apps.map((app) => (
				<li className={classes.marginBottom} key={app.appName}>
					<Typography variant="h5" paragraph gutterBottom data-testid={app.appName}>
						{app.appName}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{app.bodyText}
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4} lg={3}>
							<Link
								className={classes.recommendedLinks}
								href={app.linkPlayStore}
								target="_blank"
							>
								Google PlayStore
							</Link>
						</Grid>
						<Grid item xs={12} sm={4} lg={3}>
							<Link
								className={classes.recommendedLinks}
								href={app.linkAppleStore}
								target="_blank"
							>
								Apple AppStore
							</Link>
						</Grid>
						<Grid item xs={12} sm={4} lg={3}>
							{app.linkOfficialPage && (
								<Link
									className={classes.recommendedLinks}
									href={app.linkOfficialPage}
									target="_blank"
								>
									{translate("official_site", lng)}
								</Link>
							)}
						</Grid>
					</Grid>
				</li>
			))}
		</ul>
	)
}

type Props = {
	apps: RecommendedAppsT[]
}

export default MapRecommendations
