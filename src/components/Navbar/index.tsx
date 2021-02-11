import React, { useState, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../redux/actions/themeActions"
import { RootState } from "../../redux/store"

import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Brightness4Icon from "@material-ui/icons/Brightness4"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import TranslateIcon from "@material-ui/icons/Translate"

import { translate } from "../../lang"
import { setLanguage } from "../../redux/actions/langActions"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			paddingTop: "4rem",
		},
		menuButton: {
			marginRight: theme.spacing(2),
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
						<Typography variant="h6" className={classes.title}>
							{translate("prueba", language)}
						</Typography>

						<IconButton
							aria-controls="lang-menu"
							aria-haspopup="true"
							color="inherit"
							onClick={handleClick}
						>
							<TranslateIcon />
						</IconButton>
						<Button color="inherit">Login</Button>
						<IconButton edge="end" color="inherit" onClick={toggleDarkTheme}>
							{theme === "dark" ? <NightsStayIcon /> : <Brightness4Icon />}
						</IconButton>
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
