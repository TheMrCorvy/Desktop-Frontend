import React, { FC, useEffect, useState } from "react"

import { Container, Grid, Typography } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { showError } from "../redux/actions/errorHandlingActions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import FeedbackForm from "../components/FeedbackForm"
import Downloads from "../components/Sections/Downloads"
import AccessManagement from "../components/Sections/AccessManagement"
import CredentialCard from "../components/CredentialCard"

import { getUser } from "../misc/indexedDB"

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
	const { lng } = useSelector((state: RootState) => state.lng)

	const [availableSlots, setAvailableSlots] = useState(0)

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		getUser().then((user: any) => {
			if (user !== undefined && !user.failed) {
				setAvailableSlots(user.slots_available)
			} else {
				dispatch(showError(translate("error_messages", lng, 0)))
			}
		})
	}, [])

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="center">
				<AccessManagement />

				{availableSlots >= 1 && (
					<Grid item xs={12} md={10} lg={8} className={classes.availableSlots}>
						<Grid container spacing={5}>
							<Grid item xs={12}>
								<Typography variant="h5">
									{translate("available_slots", lng)}
								</Typography>
							</Grid>

							<CredentialCard availableSlots={availableSlots} credentials={[]} />
						</Grid>
					</Grid>
				)}
			</Grid>
			<FeedbackForm />
			<Downloads />
		</Container>
	)
}

export default MyAccount
