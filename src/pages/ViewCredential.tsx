import React, { FC, useState, useEffect } from "react"

import { Container, Grid, Typography, Button } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

/************************************************************************************ redux related */
import { showError } from "../redux/actions/errorHandlingActions"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import { CredentialT } from "../misc/types"
import { findCredential, DBErrorT, getUser, putCredential } from "../misc/indexedDB"

import { findCredentialFromApi } from "../misc/ajaxManager"

import Snackbar from "../components/Snackbar"
import ShowCredential from "../components/ShowCredential"

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
		// since the url param is a string, we have to convert it into a number
		const id = Number(props.match.params.credentialId)

		findCredential(id).then((result: any) => {
			if (!result || result.error || result === undefined) {
				setError(true)

				setSnackbarMessage(translate("error_messages", lng, 0))

				console.error(result.error)
			} else {
				setCredential(result)
			}
		})
	}, [])

	const getFromApi = async () => {
		setError(false)

		let localUser = await getUser().then((user: any) => user)

		if (localUser === undefined || localUser.failed) {
			return fatalError(localUser)
		}

		const newCredential: { credential: CredentialT } = findCredentialFromApi(
			localUser.id,
			token
		)

		putCredential(newCredential.credential).then((result: any) => {
			if (result.failed) {
				fatalError(result)
			}
		})

		setCredential(newCredential.credential)
	}

	const fatalError = (error: DBErrorT) => {
		setError(true)

		setSnackbarMessage(translate("error_messages", lng, 2))

		console.error({ error })

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
								onClick={getFromApi}
							>
								{translate("retry", lng)}
							</Button>
						</Grid>
						<Snackbar open={error} message={snackbarMessage} />
					</>
				) : (
					<ShowCredential credential={credential} />
				)}
			</Grid>
		</Container>
	)
}

export default ViewCredential
