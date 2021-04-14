import React, { FC } from "react"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import TranslateButton from "./NavbarButtons/TranslateButton"
import ToggleDarkTheme from "./NavbarButtons/ToggleDarkTheme"

/************************************************************************************ mui related */
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Tooltip,
	Fab,
	Hidden,
} from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import MenuIcon from "@material-ui/icons/Menu"

/************************************************************************************ redux related */
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { toggleDrawer } from "../../redux/actions/drawerActions"
import { logOut } from "../../redux/actions/authTokenActions"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbarItem: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
			color: "white",
		},
		title: {
			flexGrow: 1,
		},
		appBar: {
			top: "auto",
			bottom: 0,
		},
		grow: {
			flexGrow: 1,
		},
		fabButton: {
			position: "absolute",
			zIndex: 1,
			top: -30,
			left: 0,
			right: 0,
			margin: "0 auto",
		},
		link: {
			textDecoration: "none",
			color: "inherit",
		},
	})
)

const Navbar: FC = () => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const { lng } = useSelector((state: RootState) => state.lng)

	const { token } = useSelector((state: RootState) => state.token)

	const classes = useStyles()

	const dispatch = useDispatch()

	return (
		<>
			<div className={classes.root}>
				<Hidden smDown>
					<AppBar
						position="fixed"
						color={theme === "dark" ? "primary" : "secondary"}
						data-testid="test_large_navbar"
					>
						<Toolbar>
							<Tooltip title={translate("home", lng)}>
								<Link to="/" className={classes.link}>
									<IconButton
										edge="start"
										className={classes.navbarItem}
										color="default"
										aria-label="logo"
									>
										<FontAwesomeIcon icon={["fas", "key"]} />
									</IconButton>
								</Link>
							</Tooltip>

							<Typography variant="h6" className={classes.title}>
								<Tooltip title={translate("home", lng)}>
									<Link to="/" className={classes.link}>
										{translate("app_name", lng)}
									</Link>
								</Tooltip>
							</Typography>

							<TranslateButton className={classes.navbarItem} />

							{!token ? (
								<>
									<Link to="/login" className={classes.link}>
										<Button color="inherit" className={classes.navbarItem}>
											{translate("navbar_login_btn", lng)}
										</Button>
									</Link>

									<Link to="/register" className={classes.link}>
										<Button color="inherit" className={classes.navbarItem}>
											{translate("navbar_register_btn", lng)}
										</Button>
									</Link>
								</>
							) : (
								<>
									<Link to="/my-credentials" className={classes.link}>
										<Button color="inherit" className={classes.navbarItem}>
											{translate("navbar_my_credentials_btn", lng)}
										</Button>
									</Link>

									<Link to="/my-account" className={classes.link}>
										<Button color="inherit" className={classes.navbarItem}>
											{translate("navbar_my_account_btn", lng)}
										</Button>
									</Link>
									<Button
										color="inherit"
										className={classes.navbarItem}
										onClick={() => dispatch(logOut())}
									>
										{translate("navbar_log_out_btn", lng)}
									</Button>
								</>
							)}

							<ToggleDarkTheme className={classes.navbarItem} />

							<Link to="/downloads" className={classes.link}>
								<Tooltip title={translate("downloads", lng)}>
									<IconButton
										edge="start"
										className={classes.navbarItem}
										color="inherit"
										aria-label="logo"
									>
										<FontAwesomeIcon icon={["fas", "cloud-download-alt"]} />
									</IconButton>
								</Tooltip>
							</Link>
						</Toolbar>
					</AppBar>
				</Hidden>

				<Hidden mdUp>
					<AppBar
						position="fixed"
						color="secondary"
						className={classes.appBar}
						data-testid="test_small_navbar"
					>
						<Toolbar>
							<TranslateButton edge="start" />

							<ToggleDarkTheme />

							<Link to="/">
								<Fab color="primary" aria-label="add" className={classes.fabButton}>
									<FontAwesomeIcon icon={["fas", "key"]} size="2x" />
								</Fab>
							</Link>
							<div className={classes.grow} />

							<IconButton
								edge="end"
								color="inherit"
								aria-label="open drawer"
								onClick={() => dispatch(toggleDrawer(true))}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
				</Hidden>
			</div>
		</>
	)
}

export default Navbar
