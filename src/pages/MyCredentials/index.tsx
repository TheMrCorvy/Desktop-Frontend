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
import { DBErrorT, getCredentials, getUser, putCredentials, putUser } from "../../misc/indexedDB"

/************************************************************************************ types imports */
import OrderBar, { By } from "../../components/OrderBar"
import CredentialCard, { CredentialT } from "../../components/CredentialCard"

/************************************************************************************ ajax */
import { ApiResponseGetCredentialsT, getCredentialsFromApi } from "../../misc/ajaxManager"

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

	const orderBy = (order: By) => {
		console.log(order)
	}

	const getFromApi = async () => {
		setError(false)

		let localUser = await getUser().then((user: any) => user)

		if (localUser === undefined || localUser.failed) {
			return fatalError(localUser)
		}

		const newCredentials: ApiResponseGetCredentialsT = getCredentialsFromApi(
			localUser.id,
			token
		)

		localUser.availableSlots = newCredentials.available_slots

		putUser(localUser).then((result: any) => {
			if (result.failed) {
				fatalError(result)
			}
		})

		putCredentials(newCredentials.user_credentials).then((result: any) => {
			if (result.failed) {
				fatalError(result)
			}
		})

		setAvailableSlots(newCredentials.available_slots)

		setCredentials(newCredentials.user_credentials)
	}

	const fatalError = (error: DBErrorT) => {
		setError(true)

		setSnackbarMessage(translate("error_messages", lng, 2))

		console.log({ error })

		dispatch(logOut())
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
