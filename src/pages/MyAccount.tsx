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

import { getUser, getCredentials } from "../misc/indexedDB"
import RecentAccessTable from "../components/Sections/RecentAccessTable"
import { UserT } from "../misc/ajaxManager"
import UpdateRole from "../components/Sections/UpdateRole"
import { CredentialT } from "../misc/types"

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

	const [user, setUser] = useState<UserT | null>(null)

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		getUser().then((user: any) => {
			if (user !== undefined && !user.failed) {
				setUser(user)
			} else {
				dispatch(showError(translate("error_messages", lng, 0)))
			}
		})

		getCredentials().then((data) => {
			if (data.userData && data.credentials) {
				setCredentials(data.credentials)
			} else {
				dispatch(showError(translate("error_messages", lng, 0)))

				console.error(data.error)
			}
		})
	}, [])

	const isUserAllowed = () => {
		if (user !== null) {
			if (user.role === "premium" || user.role === "admin") {
				return <FeedbackForm />
			}
		}

		return null
	}

	const canBuySlots = () => {
		if (user !== null) {
			if (user.role !== "premium") {
				if (user.slots_available + credentials.length < 20) {
					return true
				}
			}
		}

		return false
	}

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="center">
				<AccessManagement />

				{user && user.slots_available >= 1 && (
					<Grid item xs={12} md={10} lg={8} className={classes.availableSlots}>
						<Grid container spacing={4}>
							<Grid item xs={12}>
								<RecentAccessTable />
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h5">
									{translate("available_slots", lng)}
								</Typography>
							</Grid>

							<CredentialCard
								availableSlots={user.slots_available}
								credentials={[]}
							/>
						</Grid>
					</Grid>
				)}

				{user && <UpdateRole userRole={user.role} canBuySlots={canBuySlots()} />}
			</Grid>
			{isUserAllowed()}
			<Downloads />
		</Container>
	)
}

export default MyAccount
