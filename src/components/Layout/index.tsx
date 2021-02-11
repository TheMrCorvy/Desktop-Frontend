import React, { ReactElement } from "react"

import { Paper, Zoom, useScrollTrigger, Fab } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import Navbar from "../Navbar"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			minHeight: "100vh",
			flexGrow: 1,
			[theme.breakpoints.down("sm")]: {
				paddingTop: 0,
				paddingBottom: "4rem",
			},
			[theme.breakpoints.up("md")]: {
				paddingBottom: 0,
				paddingTop: "4rem",
			},
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
		threshold: 100,
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
			{props.children}

			<Zoom in={trigger}>
				<div onClick={handleClick} role="presentation" className={classes.backToTop}>
					<Fab color="primary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</div>
			</Zoom>
		</Paper>
	)
}

export default Layout
