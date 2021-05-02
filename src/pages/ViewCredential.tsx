import React, { FC, useState, useEffect } from "react"

import { Container, Grid, Typography, Button } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

/************************************************************************************ redux related */
import { showError } from "../redux/actions/errorHandlingActions"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import { CredentialT } from "../misc/types"
import { findCredential, getCredentials, getUser, putCredential } from "../misc/indexedDB"

import { findCredentialFromApi } from "../misc/ajaxManager"

import Snackbar from "../components/Snackbar"
import ShowCredential from "../components/Sections/ShowCredential"
import { maxSlots } from "../misc/staticData"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			minHeight: "100vh",
			paddingTop: "5.5rem",
			paddingBottom: "5.5rem",

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

const ViewCredential: FC = (props: any) => {
	const dispatch = useDispatch()

	const { token } = useSelector((state: RootState) => state.token)
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [error, setError] = useState(false)

	const [credential, setCredential] = useState<CredentialT>({
		id: 0,
		user_id: 0,
		company_id: null,
		company_name: "",
		logo_url: null,
		last_seen: "",
		recently_seen: "",
		user_name: null,
		char_count: null,
		created_at: "",
		updated_at: "",
	})

	const [snackbarMessage, setSnackbarMessage] = useState("")

	useEffect(() => {
		// since the url param is a string, we must convert it into a number
		const id = Number(props.match.params.credentialId)

		obtainCredential(id)
	}, [])

	const obtainCredential = async (id: number) => {
		const data = await findCredential(id)

		if (data === undefined) {
			setError(true)

			setSnackbarMessage(translate("error_messages", lng, 0))

			return
		}

		setCredential(data)
	}

	const getFromApi = async (decrypted: boolean, agent?: string) => {
		const isAllowedToSee = await checkUser()

		if (!isAllowedToSee) return

		setError(false)

		const newCredential: any = await findCredentialFromApi(token, decrypted, agent)

		updateCredential(newCredential.credential)

		setCredential(newCredential.credential)
	}

	const checkUser = async () => {
		const user = await getUser()

		const credentials = await getCredentials()

		if (user === undefined || credentials === undefined) {
			// get the user's data from api

			//this false is just until I create the api
			return false
		}

		if (user.role === "free" && credentials.length + user.slots_available > maxSlots.free) {
			// the user can't see their credential
			return false
		}

		if (
			user.role === "semi-premium" &&
			credentials.length + user.slots_available > maxSlots.semi_premium
		) {
			// the user also cant se the credential
			return false
		}

		return true
	}

	const updateCredential = async (c: CredentialT) => {
		const data = await putCredential(c)

		if (data === undefined) {
			fatalError()
		}
	}

	const fatalError = () => {
		setError(true)

		setSnackbarMessage(translate("error_messages", lng, 2))

		dispatch(showError(translate("error_messages", lng, 0)))
	}

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify={error ? "space-around" : "space-between"} spacing={4}>
				{error ? (
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
								onClick={() => getFromApi(false)}
							>
								{translate("retry", lng)}
							</Button>
						</Grid>
						<Snackbar open={error} message={snackbarMessage} />
					</>
				) : (
					<ShowCredential credential={credential} getDecryptedCredential={getFromApi} />
				)}
			</Grid>
		</Container>
	)
}

export default ViewCredential
