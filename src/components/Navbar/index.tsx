import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../redux/actions/themeActions"
import { RootState } from "../../redux/store"

import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		toggleTheme: {
			textTransform: "capitalize",
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
			<AppBar position="static" color="inherit">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						News
					</Typography>
					<Button
						color="inherit"
						className={classes.toggleTheme}
						onClick={toggleDarkTheme}
					>
						{theme}
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
