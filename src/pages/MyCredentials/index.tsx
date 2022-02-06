import { FC, useState, useEffect } from "react"

/************************************************************************************ mui  */
import { Container, Grid, Button, Typography } from "@material-ui/core"

import useStyles from "./styles"

/************************************************************************************ redux  */
import { showError } from "../../redux/actions/errorHandlingActions"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { toggleLoading, setErrorLoading } from "../../redux/actions/loadingActions"

import { translate } from "../../lang"

/************************************************************************************ indexedDB */
import { getCredentials, getUser, putCredentials } from "../../misc/indexedDB"

/************************************************************************************ types & components */
import OrderBar, { By, Direction } from "../../components/OrderBar"
import CredentialCard from "../../components/CredentialCard"
import Downloads from "../../components/Sections/Downloads"
import Snackbar from "../../components/Snackbar"
import FeedbackForm from "../../components/Sections/FeedbackForm"
import UpdateRole from "../../components/Sections/UpdateRole"

/******************************************************************************** types */
import { CredentialT, UserT, ApiCallI } from "../../misc/types"

/************************************************************************************ ajax */
import { useApi } from "../../hooks/useApi"

const MyCredentials: FC = () => {
	const { token } = useSelector((state: RootState) => state.token)
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const dispatch = useDispatch()

	const [user, setUser] = useState<UserT | null>(null)

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const [error, setError] = useState<boolean>(false)

	const [snackbarMessage, setSnackbarMessage] = useState("")

	const callApi = useApi

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

		if (!token) return

		let localUser = await getUser()

		if (localUser === undefined) {
			return fatalError()
		}

		dispatch(toggleLoading(true))

		const request: ApiCallI = {
			lng,
			token,
			method: "GET",
			endpoint: "/credential/index",
		}

		callApi(request).then(async (response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))
			}

			const data = await putCredentials(response.data.credentials)

			if (data === undefined) {
				fatalError()
			}

			setCredentials(response.data.credentials)

			dispatch(toggleLoading(false))
		})
	}

	const fatalError = () => {
		setError(true)

		setSnackbarMessage(translate("error_messages", lng, 2))

		dispatch(showError(translate("error_messages", lng, 0)))
	}

	const isAllowed = () => {
		if (user !== null) {
			if (user.role === "premium") {
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
			{isAllowed()}
			<Downloads />
		</>
	)
}

type Sort = {
	by: By
	direction: Direction
}

export default MyCredentials
