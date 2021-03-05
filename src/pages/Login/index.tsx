import React, { FC } from "react"
import { Link } from "react-router-dom"

import {
	Container,
	Grid,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Button,
} from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import LoginOptions from "../../components/Sections/LoginOptions"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_login_page">
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
							<LoginOptions />
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
