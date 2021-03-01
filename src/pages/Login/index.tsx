import React, { FC, useState, ChangeEvent } from "react"
import { Link } from "react-router-dom"

import {
	Container,
	Grid,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Button,
	Tab,
	Tabs,
} from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import ReCAPTCHA from "react-google-recaptcha"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import TwoFactorCode from "../../components/Sections/LoginOptions/TwoFactorCode"
import EmailCode from "../../components/Sections/LoginOptions/EmailCode"
import SecurityCode from "../../components/Sections/LoginOptions/SecurityCode"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: "33.33%",
			flexShrink: 0,
		},
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
		},
		centerAll: {
			minHeight: "100vh",

			[theme.breakpoints.down("sm")]: {
				marginTop: "4rem",
			},
			[theme.breakpoints.up("md")]: {
				display: "flex",
				alignItems: "center",
			},
		},
		button: {
			textDecoration: "none",
		},
		title: {
			marginRight: 100,
		},
		card: {
			borderRadius: 7,

			[theme.breakpoints.down("sm")]: {
				marginBottom: "4rem",
			},
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
	})
)

const Login: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	const [tab, setTab] = useState(0)

	const [isRobot, setIsRobot] = useState(true)

	const handleTabs = (event: ChangeEvent<{}>, newValue: number) => {
		setTab(newValue)
	}

	const showOptions = (option: number) => {
		switch (option) {
			case 0:
				return <TwoFactorCode isRobot={isRobot} />
			case 1:
				return <EmailCode isRecovery={false} isRobot={isRobot} />
			case 2:
				return <EmailCode isRecovery={true} isRobot={isRobot} />
			case 3:
				return <SecurityCode isRobot={isRobot} />

			default:
				return <TwoFactorCode isRobot={isRobot} />
		}
	}

	const handleChange = (captchaResponse: string | null) => {
		if (captchaResponse) {
			setIsRobot(false)
		}
	}

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_not_found_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} md={7}>
					<Card className={classes.card} elevation={2}>
						<CardHeader
							title={translate("navbar_login_btn", lng)}
							subheader={translate("login_subtitle", lng)}
							classes={{
								subheader: classes.cardSubheader,
								title: classes.cardHeader,
							}}
						/>
						<CardContent>
							<Grid container spacing={3} justify="center">
								<Grid
									item
									xs={12}
									style={{ display: "flex", justifyContent: "center" }}
								>
									<Tabs
										value={tab}
										indicatorColor="primary"
										textColor="primary"
										onChange={handleTabs}
										scrollButtons="off"
										variant="scrollable"
									>
										<Tab label={translate("login_options", lng, 0)} />
										<Tab label={translate("login_options", lng, 1)} />
										<Tab label={translate("login_options", lng, 2)} />
										<Tab label={translate("login_options", lng, 3)} />
									</Tabs>
								</Grid>
								<Grid
									item
									xs={12}
									style={{ display: "flex", justifyContent: "center" }}
								>
									<ReCAPTCHA
										onChange={handleChange}
										sitekey="6LcxYW0aAAAAAEnierwCCRtIGZwUsp4dLg1BWNtn"
										theme={theme}
									/>
								</Grid>
								<Grid item xs={12} style={{ paddingTop: 15 }}>
									{showOptions(tab)}
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
	)
}

export default Login
