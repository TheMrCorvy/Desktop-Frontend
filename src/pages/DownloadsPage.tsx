import React from "react"

import { Container, Divider, Grid, Hidden, Typography, Link } from "@material-ui/core"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import {
	recommendedTwoFactorApps,
	recommendedApps,
	RecommendedAppsType,
} from "../components/staticData"

import Downloads from "../components/Sections/Downloads"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		divider: {
			marginBottom: "5rem",
			marginTop: "5rem",
		},
		recommendedLinks: {
			marginRight: 35,
			color: theme.palette.primary.main,
		},
		marginBottom: {
			marginBottom: "3rem",
		},
		landingSection: {
			minHeight: "70vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		container: {
			paddingBottom: "5rem",
			paddingTop: "2rem",
		},
	})
)

const DownloadsPage = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const recommendedTwoFA: RecommendedAppsType[] = recommendedTwoFactorApps(lng)

	const otherApps: RecommendedAppsType[] = recommendedApps(lng)

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} className={classes.landingSection}>
					<Downloads testing alternative />
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
					<ul>
						{otherApps.map((app, index) => (
							<li className={classes.marginBottom} key={index}>
								<Typography variant="h5" paragraph gutterBottom>
									{app.appName}
								</Typography>
								<Typography variant="body1" paragraph gutterBottom>
									{app.bodyText}
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={4}>
										<Link
											className={classes.recommendedLinks}
											href={app.linkPlayStore}
											target="_blank"
										>
											Google PlayStore
										</Link>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Link
											className={classes.recommendedLinks}
											href={app.linkAppleStore}
											target="_blank"
										>
											Apple AppStore
										</Link>
									</Grid>
									<Grid item xs={12} sm={4}>
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
				</Grid>
				<Grid item xs={12} sm={11} md={8}>
					<ul>
						{recommendedTwoFA.map((app, index) => (
							<li style={{ marginBottom: 32 }} key={index}>
								<Typography variant="h5" paragraph gutterBottom>
									{app.appName}
								</Typography>
								<Typography variant="body1" paragraph gutterBottom>
									{app.bodyText}
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={4}>
										<Link
											className={classes.recommendedLinks}
											href={app.linkPlayStore}
											target="_blank"
										>
											Google PlayStore
										</Link>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Link
											className={classes.recommendedLinks}
											href={app.linkAppleStore}
											target="_blank"
										>
											Apple AppStore
										</Link>
									</Grid>
									<Grid item xs={12} sm={4}>
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
				</Grid>
			</Grid>
		</Container>
	)
}

export default DownloadsPage
