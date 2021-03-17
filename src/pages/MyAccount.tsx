import React, { FC } from "react"

import { Container, Grid } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import FeedbackForm from "../components/FeedbackForm"
import Downloads from "../components/Sections/Downloads"
import AccessManagement from "../components/Sections/AccessManagement"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: "7rem",
			background: theme.palette.background.default,
		},
	})
)

const MyAccount: FC = () => {
	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="center">
				<AccessManagement />
			</Grid>
			<FeedbackForm />
			<Downloads />
		</Container>
	)
}

export default MyAccount
