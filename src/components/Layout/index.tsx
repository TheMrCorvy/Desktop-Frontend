import { FC, ReactElement } from "react"

import { Paper, Zoom, useScrollTrigger, Fab } from "@material-ui/core"

import useStyles from "./styles"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import Navbar from "../Navbar"
import Drawer from "../Navbar/Drawer"
import Footer from "../Footer"

type Props = { children: ReactElement }

const Layout: FC<Props> = (props) => {
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
