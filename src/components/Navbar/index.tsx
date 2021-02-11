import React, { useState, MouseEvent } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/*********************************************************************************** mui related */
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Menu,
	MenuItem,
	Tooltip,
	Fab,
	Hidden,
} from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Brightness4Icon from "@material-ui/icons/Brightness4"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import TranslateIcon from "@material-ui/icons/Translate"

import MenuIcon from "@material-ui/icons/Menu"

/*********************************************************************************** redux related */
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../redux/actions/themeActions"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"
import { setLanguage } from "../../redux/actions/langActions"

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

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (value: string) => {
		setAnchorEl(null)

		if (value !== "no change") {
			dispatch(setLanguage(value))
		}
	}

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

							<Tooltip title={translate("translate", lng)}>
								<IconButton
									aria-controls="lang-menu"
									aria-haspopup="true"
									color="inherit"
									onClick={handleClick}
									className={classes.navbarItem}
								>
									<TranslateIcon />
								</IconButton>
							</Tooltip>

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
							<IconButton
								aria-controls="lang-menu"
								aria-haspopup="true"
								color="inherit"
								onClick={handleClick}
								edge="start"
							>
								<TranslateIcon />
							</IconButton>

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

			<Menu
				id="lang-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={() => handleClose("no change")}
			>
				<MenuItem onClick={() => handleClose("en")}>EN</MenuItem>
				<MenuItem onClick={() => handleClose("es")}>ES</MenuItem>
				<MenuItem onClick={() => handleClose("jp")}>JP</MenuItem>
			</Menu>
		</>
	)
}

export default Navbar
