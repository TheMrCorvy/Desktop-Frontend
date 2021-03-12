import React, { FC, useState, useEffect } from "react"

import { Container, Grid, Button, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { logOut } from "../../redux/actions/authTokenActions"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Downloads from "../../components/Sections/Downloads"
import Snackbar from "../../components/Snackbar"
import OrderBar, { By, Direction } from "../../components/OrderBar"
import CredentialCard, { CredentialT } from "../../components/CredentialCard"
import { UserT } from "../../redux/types"
import { ApiResponseGetCredentials } from "../../components/ajaxManager"

import { credential4Testing } from "../../components/Data4Testing"

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

	const classes = useStyles()

	const dispatch = useDispatch()

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const [availableSlots, setAvailableSlots] = useState<number>(0)

	const [error, setError] = useState<boolean>(false)

	const [snackbarMessage, setSnackbarMessage] = useState("")

	const { REACT_APP_ENV_LOCAL } = process.env

	useEffect(() => {
		const getCredentials = localStorage.getItem("user_credentials")
		const getAvailableSlots = localStorage.getItem("user_data")

		let localCredentials: CredentialT[]
		let localSlots: UserT

		if (getCredentials && getAvailableSlots) {
			localCredentials = JSON.parse(getCredentials)

			localSlots = JSON.parse(getAvailableSlots)

			setAvailableSlots(localSlots.availableSlots)

			setCredentials(localCredentials)
		} else {
			setError(true)
			setSnackbarMessage("There was an error geting your data...")
		}
	}, [])

	const orderBy = (order: Order) => {
		console.log(order)
	}

	const getFromApi = () => {
		setError(false)

		let apiResponse: ApiResponseGetCredentials

		if (REACT_APP_ENV_LOCAL) {
			apiResponse = {
				available_slots: 4,
				user_credentials: credential4Testing,
			}
		} else {
			//i'm going to leave this until i'll start making the api
			apiResponse = {
				available_slots: 4,
				user_credentials: credential4Testing,
			}
			console.log("getting the fresh data, using the token: " + token)
		}

		const localUserData = localStorage.getItem("user_data")

		if (localUserData) {
			let newData: UserT = JSON.parse(localUserData)

			newData.availableSlots = apiResponse.available_slots

			localStorage.setItem("user_data", JSON.stringify(newData))

			setAvailableSlots(apiResponse.available_slots)
		} else {
			setError(true)
			setSnackbarMessage(
				"There was an error with your stored data, so we are logging you out."
			)

			console.log("There was an error with your stored data, so we are logging you out.")

			dispatch(logOut())
		}

		localStorage.setItem("user_credentials", JSON.stringify(apiResponse.user_credentials))
		setCredentials(apiResponse.user_credentials)
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
									There was an error geting your data, if you want to retry, click
									the button bellow.
								</Typography>
								<Button
									variant="contained"
									className={classes.errorBtn}
									disableElevation
									size="large"
									onClick={getFromApi}
								>
									Retry
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
