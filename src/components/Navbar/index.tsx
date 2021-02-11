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
} from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Brightness4Icon from "@material-ui/icons/Brightness4"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import TranslateIcon from "@material-ui/icons/Translate"

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
			paddingTop: "4rem",
		},
		navbarItem: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
		},
		title: {
			flexGrow: 1,
		},
	})
)

const Navbar = () => {
	/*********************************************************************************** redux related */
	const { theme } = useSelector((state: RootState) => state.theme)

	const { language } = useSelector((state: RootState) => state.language)

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
				<AppBar position="fixed" color={theme === "dark" ? "inherit" : "secondary"}>
					<Toolbar>
						<Tooltip title="Home">
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
							{translate("prueba", language)}
						</Typography>

						<Tooltip title="Translate">
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
							Login / My Credentials
						</Button>
						<Button color="inherit" className={classes.navbarItem}>
							Register / My Accounts
						</Button>

						<Tooltip title="Toggle Dark Theme">
							<IconButton
								edge="end"
								color="inherit"
								onClick={toggleDarkTheme}
								className={classes.navbarItem}
							>
								{theme === "dark" ? <NightsStayIcon /> : <Brightness4Icon />}
							</IconButton>
						</Tooltip>

						<Tooltip title="Download">
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
