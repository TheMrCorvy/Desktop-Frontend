import React, { FC } from "react"

import { Container, Grid, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import Skeleton from "@material-ui/lab/Skeleton"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles({
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
})

const Loader: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_loader_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} md={6}>
					<Typography variant="h4" paragraph gutterBottom>
						{translate("loading", lng)}
					</Typography>

					<Skeleton animation="wave" />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Loader
