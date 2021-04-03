import React, { FC, useState, useEffect } from "react"

import {
	Container,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AccordionActions,
	Button,
	Divider,
} from "@material-ui/core"

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

import UnlockData from "../components/UnlockData"
import Snackbar from "../components/Snackbar"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordion: {
			width: "100%",
			borderRadius: 8,
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		column: {
			flexBasis: "33.33%",
		},
		container: {
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			minHeight: "100vh",
			paddingTop: "7rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
		title: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
		},
		lockIcon: {
			display: "flex",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
		},
		btn: {
			color: theme.palette.error.main,
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

	const [locked, setLocked] = useState(true)

	const [error, setError] = useState(false)

	const [credential, setCredential] = useState<CredentialT | {}>({})

	const [snackbarMessage, setSnackbarMessage] = useState("")

	useEffect(() => {
		// since the url param is a string, we have to convert it into a number
		const id = Number(props.match.params.credentialId)

		findCredential(id + 1).then((result: any) => {
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
					<>
						<Grid item xs={10} sm={11} className={classes.title}>
							<Typography variant="h6">Nombre de la empresa</Typography>
						</Grid>
						<Grid item xs={2} sm={1} className={classes.lockIcon}>
							<UnlockData toggleLock={() => setLocked(!locked)} locked={locked} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Accordion defaultExpanded style={{ borderRadius: 8 }}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<div className={classes.column}>
										<Typography className={classes.heading}>
											Location
										</Typography>
									</div>
									<div className={classes.column}>
										<Typography className={classes.secondaryHeading}>
											Select trip destination
										</Typography>
									</div>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant="caption">
										Lorem ipsum dolor sit, amet consectetur adipisicing elit.
										Esse possimus numquam, sed doloribus, incidunt itaque vero
										exercitationem adipisci, suscipit alias vitae. Perferendis
										accusamus qui voluptatum cum doloremque, vitae molestias
										excepturi.
									</Typography>
								</AccordionDetails>
								<Divider />
								{!locked && (
									<AccordionActions>
										<Button size="small" className={classes.btn}>
											Remove
										</Button>
									</AccordionActions>
								)}
							</Accordion>
						</Grid>
					</>
				)}
			</Grid>
		</Container>
	)
}

export default ViewCredential
