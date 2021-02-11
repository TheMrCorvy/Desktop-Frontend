import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../redux/actions/themeActions"
import { RootState } from "../../redux/store"

import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Brightness4Icon from "@material-ui/icons/Brightness4"
import NightsStayIcon from "@material-ui/icons/NightsStay"

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
	const { theme } = useSelector((state: RootState) => state.theme)

	const dispatch = useDispatch()

	const classes = useStyles()

	const toggleDarkTheme = () => {
		if (theme === "dark") {
			dispatch(setTheme("light"))
		} else {
			dispatch(setTheme("dark"))
		}
	}

	return (
		<div className={classes.root}>
			<AppBar position="fixed" color={theme === "dark" ? "inherit" : "secondary"}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						News
					</Typography>

					<Button color="inherit">Login</Button>
					<IconButton edge="end" color="inherit" onClick={toggleDarkTheme}>
						{theme === "dark" ? <NightsStayIcon /> : <Brightness4Icon />}
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
