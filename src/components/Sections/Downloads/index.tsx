import { FC, useEffect } from "react"

import { Container, Grid, Button, Typography, Divider, Hidden } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { showError } from "../../../redux/actions/errorHandlingActions"

import { translate } from "../../../lang"

const Downloads: FC<Props> = ({ alternative }) => {
	let deferredPrompt: any

	const classes = useStyles()

	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", (e: Event) => {
			e.preventDefault()

			deferredPrompt = e

			console.log("event handled successfully")
		})

		window.addEventListener("appinstalled", () => {
			console.log("INSTALL: Success")
		})
	}, [])

	const handleInstallClick = () => {
		// this will be disabled for now
		// return
		try {
			deferredPrompt.prompt()

			deferredPrompt.userChoice.then((choiceResult: any) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted the install prompt")
				} else {
					console.log("User dismissed the install prompt")
				}
			})
		} catch (error) {
			console.log(error)

			dispatch(showError(translate("error_messages", lng, 5)))
		}
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

				<Grid item xs={12} sm={5} lg={3}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								{translate("desktop", lng)}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								href="https://github.com/PasuSewa/Desktop-Frontend/releases/download/Ver.4.11/pasunashi.Setup.1.0.1.exe"
								target="_blank"
							>
								Windows
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="secondary"
								href="https://github.com/PasuSewa/Desktop-Frontend/releases/download/Ver.4.11/pasunashi-1.0.1.dmg"
								target="_blank"
							>
								Mac
							</Button>
						</Grid>
					</Grid>
				</Grid>

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
					</Grid>
				</Grid>

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
			</Grid>
		</Container>
	)
}

type Props = { alternative?: boolean; testing?: boolean }

/**
 * @alias Section_Downloads
 *
 * @property {boolean} [alternative] if true, title is big, false / undefined title is smaller
 *
 * @property {boolean} [testing] if testing the layout of the buttons
 */

export default Downloads
