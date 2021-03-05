import React, { useState } from "react"
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"

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

import ReCAPTCHA from "react-google-recaptcha"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import RegisterSteps from "../../components/Sections/RegisterSteps"
import RegisterDialog from "../../components/Sections/RegisterDialog"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			paddingTop: "4rem",
			paddingBottom: "2rem",
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
		cardContent: {
			paddingRight: 0,
			paddingLeft: 0,
		},
		centerCaptcha: {
			display: "flex",
			alignItems: "center",
			textAlign: "center",
			justifyContent: "center",
		},
	})
)

const Register = ({ testing }: { testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const theme = useTheme()

	const [isRobot, setIsRobot] = useState(testing ? false : true)

	const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env

	const handleChangeCaptcha = (captchaResponse: string | null) => {
		if (captchaResponse) {
			setIsRobot(false)
		}
	}

	const handleErrorCaptcha = () => {
		setIsRobot(true)
	}

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
						<CardContent className={classes.cardContent}>
							<Grid container justify="center" spacing={1}>
								<Grid item xs={12} style={{ textAlign: "center" }}>
									<RegisterDialog />
								</Grid>
								<Grid item xs={12} className={classes.centerCaptcha}>
									<ReCAPTCHA
										onChange={handleChangeCaptcha}
										sitekey={`${REACT_APP_RECAPTCHA_SITE_KEY}`}
										theme={theme.palette.type}
										onExpired={handleErrorCaptcha}
										onErrored={handleErrorCaptcha}
									/>
								</Grid>
								<Grid item xs={12} style={{ marginRight: 15, marginLeft: 15 }}>
									<RegisterSteps isRobot={isRobot} />
								</Grid>
							</Grid>
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

export default Register
