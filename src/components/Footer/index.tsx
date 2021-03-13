import React, { FC } from "react"

import { Container, Grid, Tooltip, IconButton, Typography, Link } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import TranslateButton from "../../components/Navbar/NavbarButtons/TranslateButton"

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		background: grey[900],
		minHeight: "30vh",
		color: "white",
	},
	container: {
		paddingTop: "3rem",
		paddingBottom: "6rem",
	},
	textCenter: {
		textAlign: "center",
	},
	link: {
		color: "white",
	},
})

const Footer: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { token } = useSelector((state: RootState) => state.token)

	const classes = useStyles()

	return (
		<div className={classes.root} data-testid="test_footer">
			<Container maxWidth="xl" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={12} sm={1} className={classes.textCenter}>
						<Tooltip title={translate("home", lng)}>
							<Link href="/" color="inherit">
								<IconButton edge="start" color="inherit" aria-label="logo">
									<FontAwesomeIcon icon={["fas", "key"]} size="2x" />
								</IconButton>
							</Link>
						</Tooltip>
					</Grid>
					<Grid item xs={12} sm={11} md={9}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item xs={12}>
								<Typography variant="body2" gutterBottom paragraph>
									{translate("footer_texts", lng, 0)}
								</Typography>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Typography variant="body2" gutterBottom paragraph>
									<Typography component="span">
										<a
											href="https://github.com/PasuSewa/Mobile-FrontEnd"
											target="_blank"
											className={classes.link}
										>
											React Native
										</a>
									</Typography>
								</Typography>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Typography variant="body2" gutterBottom paragraph>
									<Typography component="span">
										<a
											href="https://github.com/PasuSewa/Web-FrontEnd"
											target="_blank"
											className={classes.link}
										>
											React JS
										</a>
									</Typography>
								</Typography>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Typography variant="body2" gutterBottom paragraph>
									<Typography component="span">
										<a
											href="https://github.com/PasuSewa/Desktop-FrontEnd"
											target="_blank"
											className={classes.link}
										>
											Electron
										</a>
									</Typography>
								</Typography>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Typography variant="body2" gutterBottom paragraph>
									<Typography component="span">
										<a
											href="https://github.com/PasuSewa/Backend"
											target="_blank"
											className={classes.link}
										>
											Laravel
										</a>
									</Typography>
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="body2" gutterBottom paragraph>
									{translate("footer_texts", lng, 1)}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="body2" gutterBottom paragraph>
									PasuSewa &copy; 2021{" "}
									<Typography component="span">
										<a
											href="http://corvalangonzalo.xyz"
											target="_blank"
											className={classes.link}
										>
											Gonzalo Salvador Corvalan
										</a>
									</Typography>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={2} className={classes.textCenter}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item xs={3} md={12}>
								<Link href="/" color="inherit">
									{translate("downloads", lng)}
								</Link>
							</Grid>
							{!token ? (
								<>
									<Grid item xs={3} md={12}>
										<Link href="/login" color="inherit">
											{translate("navbar_login_btn", lng)}
										</Link>
									</Grid>

									<Grid item xs={3} md={12}>
										<Link href="/register" color="inherit">
											{translate("navbar_register_btn", lng)}
										</Link>
									</Grid>
								</>
							) : (
								<>
									<Grid item xs={3} md={12}>
										<Link href="/my-account" color="inherit">
											{translate("navbar_my_account_btn", lng)}
										</Link>
									</Grid>
									<Grid item xs={3} md={12}>
										<Link href="/my-credentials" color="inherit">
											{translate("navbar_my_credentials_btn", lng)}
										</Link>
									</Grid>
								</>
							)}
							<Grid item xs={3} md={12}>
								<TranslateButton style={{ padding: 0 }} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Footer
