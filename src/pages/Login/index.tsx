import { FC, useState } from "react"
import { Link } from "react-router-dom"

import ReCAPTCHA from "react-google-recaptcha"

/************************************************************************************ mui related */
import {
	Container,
	Grid,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Button,
} from "@material-ui/core"

import useStyles from "./styles"

/************************************************************************************ redux related */
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { login } from "../../redux/actions/authTokenActions"
import { translate } from "../../lang"

/************************************************************************************ manage info */
import { ApiResponseLoginT } from "../../misc/types"

import { initiateDB } from "../../misc/indexedDB"

/************************************************************************************ my components */
import Snackbar from "../../components/Utils/Snackbar"
import LoginOptions from "../../components/Sections/LoginOptions"
import { setLanguage } from "../../redux/actions/langActions"

const Login: FC = () => {
	const { REACT_APP_ENV_LOCAL, REACT_APP_RECAPTCHA_SITE_KEY } = process.env

	const { lng } = useSelector((state: RootState) => state.lng)
	const { theme } = useSelector((state: RootState) => state.theme)

	const [error, setError] = useState(false)
	const [isRobot, setIsRobot] = useState(REACT_APP_ENV_LOCAL ? false : true)

	const dispatch = useDispatch()
	const classes = useStyles()

	const cardSubtitle = REACT_APP_ENV_LOCAL
		? "You don't need to check the 'im not a robot' to login, since we're in local env"
		: translate("login_subtitle", lng)

	const handleChangeCaptcha = (captchaResponse: string | null) => {
		if (captchaResponse) {
			setIsRobot(false)
		}
	}

	const handleErrorCaptcha = () => {
		setIsRobot(true)
	}

	const onAuthSuccess = async (res: ApiResponseLoginT) => {
		const db = await initiateDB(res.user_data, res.user_credentials)

		if (db === undefined) {
			setError(true)

			return
		}

		dispatch(setLanguage(res.user_data.preferred_lang))
		dispatch(login(res.token))
	}

	return (
		<>
			<Container maxWidth="xl" className={classes.container} data-testid="test_login_page">
				<Grid container justify="center" className={classes.centerAll} spacing={0}>
					<Grid item xs={12} md={10} lg={7}>
						<Card className={classes.card} elevation={2}>
							<CardHeader
								title={translate("navbar_login_btn", lng)}
								subheader={cardSubtitle}
								classes={{
									subheader: classes.cardSubheader,
									title: classes.cardHeader,
								}}
							/>
							<CardContent>
								<Grid container justify="center" spacing={4}>
									<Grid item xs={12} className={classes.captcha}>
										<ReCAPTCHA
											onChange={handleChangeCaptcha}
											sitekey={`${REACT_APP_RECAPTCHA_SITE_KEY}`}
											theme={theme}
											onExpired={handleErrorCaptcha}
											onErrored={handleErrorCaptcha}
										/>
									</Grid>

									<Grid item xs={12}>
										<LoginOptions
											isRobot={isRobot}
											onAuthSuccess={onAuthSuccess}
										/>
									</Grid>
								</Grid>
							</CardContent>
							<CardActions className={classes.cardActions}>
								<Link to="/" className={classes.link}>
									<Button size="large" color="primary">
										{translate("home", lng)}
									</Button>
								</Link>
								<Link to="/register" className={classes.link}>
									<Button size="large" color="primary">
										{translate("navbar_register_btn", lng)}
									</Button>
								</Link>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
			{error && (
				<Snackbar
					message={translate("error_messages", lng, 3)}
					open={error}
					duration={35000}
				/>
			)}
		</>
	)
}

export default Login
