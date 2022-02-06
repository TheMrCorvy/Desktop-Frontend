import { FC, ReactElement } from "react"

import { Paper, Zoom, useScrollTrigger, Fab, Backdrop, CircularProgress } from "@material-ui/core"

import useStyles from "./styles"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import Navbar from "../../UI-Components/Navbar"
import Drawer from "../../UI-Components/Navbar/Drawer"
import Footer from "../../UI-Components/Footer"
import Snackbar from "../Snackbar"

type Props = { children: ReactElement }

const Layout: FC<Props> = (props) => {
	const loading = useSelector((state: RootState) => state.loading)

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
		<>
			{loading.loading && (
				<Backdrop open={loading.loading} className={classes.backdrop}>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
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
			{loading.error && (
				<Snackbar
					message={loading.error}
					open={true}
					isError={true}
					duration={25000}
					horizontalPosition="center"
				/>
			)}
		</>
	)
}

export default Layout
