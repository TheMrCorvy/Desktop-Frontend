import { FC, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import {
	Grid,
	Container,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardActions,
} from "@material-ui/core"

import { useTheme } from "@material-ui/core/styles"
import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import RegisterSteps from "../../components/Sections/RegisterSteps"
import RegisterDialog from "../../components/Sections/RegisterDialog"

const Register: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()
	const theme = useTheme()
	const { REACT_APP_RECAPTCHA_SITE_KEY, REACT_APP_ENV_LOCAL } = process.env

	const [isRobot, setIsRobot] = useState(true)

	useEffect(() => {
		if (REACT_APP_ENV_LOCAL) {
			setIsRobot(false)
		}
	}, [])

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
								<Grid item xs={12} style={{ marginRight: 15, marginLeft: 15 }}>
									<RegisterSteps isRobot={false} />
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
