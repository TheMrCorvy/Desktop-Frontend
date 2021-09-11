import { FC, ReactElement } from "react"

import { Paper, Zoom, useScrollTrigger, Fab, Backdrop, CircularProgress } from "@material-ui/core"

import useStyles from "./styles"

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import Navbar from "../Navbar"
import Drawer from "../Navbar/Drawer"
import Footer from "../Footer"
import Snackbar from "../Snackbar"

type Props = { children: ReactElement }

const Layout: FC<Props> = (props) => {
	const { loading } = useSelector((state: RootState) => state.loading)
	const error = useSelector((state: RootState) => state.loading.error)

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
			{loading && (
				<Backdrop open={loading} className={classes.backdrop}>
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
			{error && (
				<Snackbar
					message={error}
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
