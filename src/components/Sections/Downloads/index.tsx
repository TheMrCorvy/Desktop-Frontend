import React, { useEffect, useState } from "react"

import { Container, Grid, Button, Typography, Divider, Hidden } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { purple, indigo } from "@material-ui/core/colors"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		linuxBtn: {
			backgroundColor: purple[400],
			"&:hover": {
				backgroundColor: purple[500],
			},
		},
		webBtn: {
			backgroundColor: indigo["A400"],
			"&:hover": {
				backgroundColor: indigo["A700"],
			},
		},
		androidBtn: {
			backgroundColor: theme.palette.type === "dark" ? "#1fad2c" : "#1ebd2d",
			"&:hover": {
				backgroundColor: theme.palette.type === "dark" ? "#15a122" : "#1cad29",
			},
		},
		container: {
			paddingTop: 65,
			paddingBottom: 45,
			textAlign: "center",

			[theme.breakpoints.down("xs")]: {
				paddingTop: 0,
			},
		},
		marginB: {
			marginBottom: 30,
		},
		underline: {
			borderBottom: "1px solid",
		},
	})
)

let deferredPrompt: any

const Downloads = ({ alternative, testing }: { alternative?: boolean; testing?: boolean }) => {
	const classes = useStyles()

	const { lng } = useSelector((state: RootState) => state.lng)

	const [installable, setInstallable] = useState(testing ? true : false)

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", (e: Event) => {
			e.preventDefault()

			deferredPrompt = e

			setInstallable(true)

			console.log("event handled successfully")
		})

		window.addEventListener("appinstalled", () => {
			console.log("INSTALL: Success")
		})
	}, [])

	const handleInstallClick = () => {
		setInstallable(false)

		deferredPrompt.prompt()

		deferredPrompt.userChoice.then((choiceResult: any) => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the install prompt")
			} else {
				console.log("User dismissed the install prompt")
			}
		})
	}

	return (
		<Container maxWidth="lg" className={classes.container} id="downloads-section">
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12}>
					<Typography
						gutterBottom
						variant={alternative ? "h3" : "h4"}
						className={classes.marginB}
						data-testid="test_downloads"
					>
						{translate("downloads", lng)}
					</Typography>
				</Grid>

				{installable && (
					<>
						<Grid item xs={12} sm={5} lg={2}>
							<Grid container justify="space-between" spacing={1}>
								<Grid item xs={12}>
									<Typography gutterBottom variant="h5">
										{translate("web_version", lng)}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										className={classes.webBtn}
										onClick={handleInstallClick}
									>
										{translate("install", lng)}
									</Button>
								</Grid>
							</Grid>
						</Grid>

						<Hidden xsDown>
							<Divider orientation="vertical" flexItem />
						</Hidden>

						<Hidden smUp>
							<Grid item xs={12}>
								<Divider orientation="horizontal" />
							</Grid>
						</Hidden>
					</>
				)}

				<Grid item xs={12} sm={5} lg={3}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								{translate("desktop", lng)}
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" color="primary">
								PC
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" color="secondary">
								Mac
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								color="primary"
								className={classes.linuxBtn}
							>
								Linux
							</Button>
						</Grid>
					</Grid>
				</Grid>

				{installable && (
					<>
						<Hidden only={["xs", "lg", "xl"]}>
							<Grid item xs={6}>
								<Divider orientation="horizontal" />
							</Grid>
							<Grid item xs={6}>
								<Divider orientation="horizontal" />
							</Grid>
						</Hidden>

						<Hidden mdDown>
							<Divider orientation="vertical" flexItem />
						</Hidden>
					</>
				)}

				<Hidden smUp>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Hidden>

				<Grid item xs={12} sm={5} lg={3}>
					<Grid container justify="space-between" spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								Android
							</Typography>
						</Grid>

						{installable ? (
							<>
								<Grid item xs={6}>
									<Button
										variant="contained"
										color="primary"
										className={classes.androidBtn}
									>
										Play Store
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant="contained"
										color="primary"
										className={classes.webBtn}
										onClick={handleInstallClick}
									>
										{translate("install", lng)}
									</Button>
								</Grid>
							</>
						) : (
							<>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										className={classes.androidBtn}
									>
										Play Store
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				</Grid>

				{installable && (
					<>
						<Hidden smUp>
							<Grid item xs={12}>
								<Divider orientation="horizontal" />
							</Grid>
						</Hidden>

						<Hidden xsDown>
							<Divider orientation="vertical" flexItem />
						</Hidden>

						<Grid item xs={12} sm={5} lg={2}>
							<Grid container justify="space-between" spacing={1}>
								<Grid item xs={12}>
									<Typography gutterBottom variant="h5">
										IOS
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										className={classes.webBtn}
										onClick={handleInstallClick}
									>
										{translate("install", lng)}
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</>
				)}
			</Grid>
		</Container>
	)
}

export default Downloads
