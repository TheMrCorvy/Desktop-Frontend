import React, { FC, useEffect, useState } from "react"

import { Container, Grid, Typography } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { showError } from "../redux/actions/errorHandlingActions"
import { useDispatch } from "react-redux"

import FeedbackForm from "../components/FeedbackForm"
import Downloads from "../components/Sections/Downloads"
import AccessManagement from "../components/Sections/AccessManagement"
import { getUser } from "../misc/indexedDB"
import CredentialCard from "../components/CredentialCard"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: "7rem",
			background: theme.palette.background.default,

			[theme.breakpoints.down("xs")]: {
				paddingTop: "2rem",
			},
		},
		availableSlots: {
			textAlign: "center",
			marginTop: "5rem",
		},
	})
)

const MyAccount: FC = () => {
	const [availableSlots, setAvailableSlots] = useState(0)

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		getUser().then((user: any) => {
			if (user !== undefined && !user.failed) {
				setAvailableSlots(user.slots_available)
			} else {
				dispatch(showError("error "))
			}
		})
	}, [])

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="center">
				<AccessManagement />

				<Grid item xs={12} md={10} lg={8} className={classes.availableSlots}>
					<Grid container spacing={5}>
						<Grid item xs={12}>
							<Typography variant="h5">Available Slots</Typography>
						</Grid>

						<CredentialCard availableSlots={availableSlots} credentials={[]} />
					</Grid>
				</Grid>
			</Grid>
			<FeedbackForm />
			<Downloads />
		</Container>
	)
}

export default MyAccount
