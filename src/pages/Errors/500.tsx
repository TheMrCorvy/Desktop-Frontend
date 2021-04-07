import React from "react"
import { Link } from "react-router-dom"

import { Container, Grid, Typography, Button } from "@material-ui/core"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import HomeIcon from "@material-ui/icons/Home"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { clearError } from "../../redux/actions/errorHandlingActions"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
		},
		centerAll: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			textAlign: "center",
		},
		button: {
			textDecoration: "none",
		},
		textDanger: {
			color: theme.palette.error.main,
		},
		dangerBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

const Error500 = () => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { err } = useSelector((state: RootState) => state.err)

	const dispatch = useDispatch()

	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_500_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12}>
					<Typography variant="h6" paragraph gutterBottom className={classes.textDanger}>
						500 {translate("error_messages", lng, 4)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{err}
					</Typography>
					<Link to="/" className={classes.button}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<HomeIcon />}
							disableElevation
							className={classes.dangerBtn}
							onClick={() => dispatch(clearError())}
						>
							{translate("home", lng)}
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Error500
