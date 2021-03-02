import React, { ReactElement } from "react"

import { Paper, Zoom, useScrollTrigger, Fab } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import Navbar from "./Navbar"
import Drawer from "./Navbar/Drawer"
import Footer from "./Footer"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			minHeight: "100vh",
			flexGrow: 1,
		},
		backToTop: {
			position: "fixed",
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
	})
)

const Layout = (props: { children: ReactElement }) => {
	const classes = useStyles()

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 200,
	})

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<Paper className={classes.main}>
			<Navbar />
			<Drawer />

			{props.children}

			<Zoom in={trigger}>
				<div onClick={handleClick} role="presentation" className={classes.backToTop}>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</div>
			</Zoom>

			<Footer />
		</Paper>
	)
}

export default Layout
