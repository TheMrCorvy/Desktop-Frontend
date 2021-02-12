import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TranslateButton from "../NavbarComponents/NavbarButtons/TranslateButton"

/*********************************************************************************** mui related */
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

import Brightness4Icon from "@material-ui/icons/Brightness4"
import NightsStayIcon from "@material-ui/icons/NightsStay"

import MenuIcon from "@material-ui/icons/Menu"

/*********************************************************************************** redux related */
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../redux/actions/themeActions"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbarItem: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
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
	})
)

const Navbar = () => {
	/*********************************************************************************** redux related */
	const { theme } = useSelector((state: RootState) => state.theme)

	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	/*********************************************************************************** mui related */
	const classes = useStyles()

	const toggleDarkTheme = () => {
		if (theme === "dark") {
			dispatch(setTheme("light"))
		} else {
			dispatch(setTheme("dark"))
		}
	}

	return (
		<>
			<div className={classes.root}>
				<Hidden smDown>
					<AppBar position="fixed" color={theme === "dark" ? "primary" : "secondary"}>
						<Toolbar>
							<Tooltip title={translate("home", lng)}>
								<IconButton
									edge="start"
									className={classes.navbarItem}
									color="inherit"
									aria-label="logo"
								>
									<FontAwesomeIcon icon={["fas", "key"]} />
								</IconButton>
							</Tooltip>

							<Typography variant="h6" className={classes.title}>
								{translate("app_name", lng)}
							</Typography>

							<TranslateButton className={classes.navbarItem} />

							<Button color="inherit" className={classes.navbarItem}>
								{translate("navbar_login_btn", lng)}
							</Button>
							<Button color="inherit" className={classes.navbarItem}>
								{translate("navbar_register_btn", lng)}
							</Button>

							<Tooltip title={translate("toggle_dark_theme", lng)}>
								<IconButton
									edge="end"
									color="inherit"
									onClick={toggleDarkTheme}
									className={classes.navbarItem}
								>
									{theme === "dark" ? <NightsStayIcon /> : <Brightness4Icon />}
								</IconButton>
							</Tooltip>

							<Tooltip title={translate("navbar_download_btn", lng)}>
								<IconButton
									edge="start"
									className={classes.navbarItem}
									color="inherit"
									aria-label="logo"
								>
									<FontAwesomeIcon icon={["fas", "cloud-download-alt"]} />
								</IconButton>
							</Tooltip>
						</Toolbar>
					</AppBar>
				</Hidden>

				<Hidden mdUp>
					<AppBar position="fixed" color="secondary" className={classes.appBar}>
						<Toolbar>
							<TranslateButton edge="start" />

							<IconButton edge="end" color="inherit" onClick={toggleDarkTheme}>
								{theme === "dark" ? <NightsStayIcon /> : <Brightness4Icon />}
							</IconButton>

							<Fab color="primary" aria-label="add" className={classes.fabButton}>
								<FontAwesomeIcon icon={["fas", "key"]} size="2x" />
							</Fab>
							<div className={classes.grow} />

							<IconButton edge="end" color="inherit" aria-label="open drawer">
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
