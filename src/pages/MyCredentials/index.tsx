import React, { FC, useState, useEffect } from "react"

/************************************************************************************ mui related */
import { Container, Grid, Button, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

/************************************************************************************ redux related */
import { logOut } from "../../redux/actions/authTokenActions"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

/************************************************************************************ my components */
import Downloads from "../../components/Sections/Downloads"
import Snackbar from "../../components/Snackbar"

/************************************************************************************ indexedDB */
import { getCredentials } from "../../misc/indexedDB"

/************************************************************************************ types imports */
import OrderBar, { By, Direction } from "../../components/OrderBar"
import CredentialCard, { CredentialT } from "../../components/CredentialCard"
import { UserT } from "../../misc/ajaxManager"
import { ApiResponseGetCredentialsT } from "../../misc/ajaxManager"

import { credential4Testing } from "../../misc/Data4Testing"

type Order = {
	by: By
	direction: Direction
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: "6rem",

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

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const [availableSlots, setAvailableSlots] = useState<number>(0)

	const [error, setError] = useState<boolean>(false)

	const [snackbarMessage, setSnackbarMessage] = useState("")

	const { REACT_APP_ENV_LOCAL } = process.env

	useEffect(() => {
		getCredentials().then((data) => {
			if (data.userData && data.credentials) {
				setAvailableSlots(data.userData.availableSlots)

				setCredentials(data.credentials)
			} else {
				setError(true)

				setSnackbarMessage(translate("error_messages", lng, 0))

				console.log(data.error)
			}
		})
	}, [])

	const orderBy = (order: Order) => {
		console.log(order)
	}

	const getFromApi = () => {
		setError(false)

		let apiResponse: ApiResponseGetCredentialsT

		if (REACT_APP_ENV_LOCAL) {
			apiResponse = {
				available_slots: 3,
				user_credentials: credential4Testing,
			}
		} else {
			//i'm going to leave this until i'll start making the api
			apiResponse = {
				available_slots: 3,
				user_credentials: credential4Testing,
			}
			console.log("getting the fresh data, using the token: " + token)
		}

		// const localUserData = localStorage.getItem("user_data")

		// if (localUserData) {
		// 	let newData: UserT = JSON.parse(localUserData)

		// 	newData.availableSlots = apiResponse.available_slots

		// 	localStorage.setItem("user_data", JSON.stringify(newData))

		// 	setAvailableSlots(apiResponse.available_slots)
		// } else {
		// 	setError(true)
		// 	setSnackbarMessage(translate("error_messages", lng, 2))

		// 	console.log(translate("error_messages", lng, 2))

		// 	dispatch(logOut())
		// }

		// localStorage.setItem("user_credentials", JSON.stringify(apiResponse.user_credentials))
		// setCredentials(apiResponse.user_credentials)
	}

	return (
		<>
			<Container maxWidth="lg" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					{!error ? (
						<>
							<OrderBar orderCredentials={orderBy} />
							<CredentialCard
								availableSlots={availableSlots}
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
							<Snackbar open={error} snackbarMessage={snackbarMessage} />
						</>
					)}
				</Grid>
			</Container>
			<Downloads testing />
		</>
	)
}

export default MyCredentials
