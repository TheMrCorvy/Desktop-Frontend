import React, { FC, useState, useEffect } from "react"

/************************************************************************************ mui  */
import { Container, Grid, Button, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

/************************************************************************************ redux  */
import { showError } from "../redux/actions/errorHandlingActions"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

/************************************************************************************ indexedDB */
import { getCredentials, getUser, initiateDB } from "../misc/indexedDB"

/************************************************************************************ types & components */
import OrderBar, { By, Direction } from "../components/OrderBar"
import CredentialCard from "../components/CredentialCard"
import Downloads from "../components/Sections/Downloads"
import Snackbar from "../components/Snackbar"
import FeedbackForm from "../components/Sections/FeedbackForm"
import UpdateRole from "../components/Sections/UpdateRole"

/******************************************************************************** types */
import { CredentialT, ApiResponseGetCredentialsT, UserT } from "../misc/types"

/************************************************************************************ ajax */
import { getCredentialsFromApi } from "../misc/ajaxManager"

type Sort = {
	by: By
	direction: Direction
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: "7rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
		error: {
			minHeight: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			flexDirection: "column",
		},
		errorBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

const MyCredentials: FC = () => {
	const { token } = useSelector((state: RootState) => state.token)
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const dispatch = useDispatch()

	const [user, setUser] = useState<UserT | null>(null)

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const [error, setError] = useState<boolean>(false)

	const [snackbarMessage, setSnackbarMessage] = useState("")

	useEffect(() => {
		obtainFromDB("credentials")
		obtainFromDB("user")
	}, [])

	const obtainFromDB = async (option: string) => {
		let data: any

		option === "user" ? (data = await getUser()) : (data = await getCredentials())

		if (data === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		option === "user" ? setUser(data) : setCredentials(data)
	}

	const orderBy = (sort: Sort) => {
		// the [...credentials] is very important, since a sorted array its still the same,
		// and thus react won't update state after re order the array.
		// so we need to copy it, creating a new array in the proces, then sorting it, and the finally update the state
		const credentialsSorted = [...credentials].sort((prev, next) => {
			if (prev[sort.by] > next[sort.by]) {
				return 1 * sort.direction
			}

			if (prev[sort.by] < next[sort.by]) {
				return -1 * sort.direction
			}

			return 0
		})
		setCredentials(credentialsSorted)
	}

	const getFromApi = async () => {
		setError(false)

		let localUser = await getUser()

		if (localUser === undefined) {
			return fatalError()
		}

		const newCredentials: ApiResponseGetCredentialsT = getCredentialsFromApi(
			localUser.id,
			token
		)

		const user = { ...localUser, availableSlots: newCredentials.slots_available }

		const data = await initiateDB(user, newCredentials.user_credentials)

		if (data === undefined) {
			fatalError()
		}

		setCredentials(newCredentials.user_credentials)
	}

	const fatalError = () => {
		setError(true)

		setSnackbarMessage(translate("error_messages", lng, 2))

		dispatch(showError(translate("error_messages", lng, 0)))
	}

	const isUserAllowedToFeedbackForm = () => {
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
		<>
			<Container
				maxWidth="lg"
				className={classes.container}
				data-testid="test_my_credentials_page"
			>
				<Grid container justify="space-around" spacing={4}>
					{!error && user ? (
						<>
							<OrderBar sortCredentials={orderBy} />
							<CredentialCard
								availableSlots={user.slots_available}
								credentials={credentials}
							/>
						</>
					) : (
						<>
							<Grid item xs={12} className={classes.error}>
								<Typography variant="subtitle1" gutterBottom paragraph>
									{translate("error_messages", lng, 1)}
								</Typography>
								<Button
									variant="contained"
									className={classes.errorBtn}
									disableElevation
									size="large"
									onClick={getFromApi}
								>
									{translate("retry", lng)}
								</Button>
							</Grid>
							<Snackbar open={error} message={snackbarMessage} />
						</>
					)}

					{user && <UpdateRole userRole={user.role} canBuySlots={canBuySlots()} />}
				</Grid>
			</Container>
			{isUserAllowedToFeedbackForm()}
			<Downloads />
		</>
	)
}

export default MyCredentials
