import { FC } from "react"

import { Container, Divider, Grid, Hidden, Typography } from "@material-ui/core"
import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { recommendedTwoFactorApps, recommendedApps } from "../../misc/staticData"
import { RecommendedAppsT } from "../../misc/types"

import Downloads from "../../components/Sections/Downloads"
import MapRecommendations from "../../components/Sections/MapRecommendations"

const DownloadsPage: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const recommendedTwoFA: RecommendedAppsT[] = recommendedTwoFactorApps(lng)

	const otherApps: RecommendedAppsT[] = recommendedApps(lng)

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_downloads_page">
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} className={classes.landingSection}>
					<Downloads alternative />
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<Hidden xsDown>
						<Typography variant="h3" paragraph gutterBottom>
							{translate("downloads_page_titles", lng, 0)}
						</Typography>
					</Hidden>
					<Hidden smUp>
						<Typography variant="h4" paragraph gutterBottom>
							{translate("downloads_page_titles", lng, 0)}
						</Typography>
					</Hidden>
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 0)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 1)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 2)}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<Typography variant="h4" paragraph gutterBottom>
						{translate("downloads_page_titles", lng, 1)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 3)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 4)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 5)}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<MapRecommendations apps={otherApps} />
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<Typography variant="h4" paragraph gutterBottom>
						{translate("downloads_page_titles", lng, 2)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 6)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 7)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 8)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 9)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 10)}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<MapRecommendations apps={recommendedTwoFA} />
				</Grid>
			</Grid>
		</Container>
	)
}

export default DownloadsPage
