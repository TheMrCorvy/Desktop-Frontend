import React, { FC, useState, useEffect } from "react"
import { CredentialT } from "../../misc/types"

import { Grid, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { initializeCredential } from "../../redux/actions/credentialActions"

import { translate } from "../../lang"

import UnlockData from "../UnlockData"
import DisplayData from "../DisplayData"
import GoBackBtn from "../GoBackBtn"
// import ShowInfo from "../ShowCredential/ShowInfo"
import DeleteCredential from "../DeleteCredential"
import Snackbar from "../Snackbar"

type Props = {
	credentialP: CredentialT
	getDecryptedCredential: (decrypted: true, agent: string) => Promise<boolean>
}

const useStyles = makeStyles({
	title: {
		display: "flex",
		textAlign: "center",
		alignItems: "center",
		textTransform: "capitalize",
	},
	lockIcon: {
		display: "flex",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
	},
})

const ShowCredential: FC<Props> = ({ credentialP, getDecryptedCredential }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { credential } = useSelector((state: RootState) => state.credential)

	const [locked, setLocked] = useState(true)

	const [visible, setVisible] = useState(false)

	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [showSnackbar, setShowSnackbar] = useState(false)

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		setIsAuthenticated(!locked)

		if (showSnackbar) {
			const timer = setTimeout(() => {
				setShowSnackbar(false)
			}, 12500)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [locked, showSnackbar])

	useEffect(() => {
		if (credentialP.id !== 0) {
			dispatch(initializeCredential(credentialP))
		}
	}, [credentialP])

	const toggleVisibility = () => {
		if (!locked && visible) {
			setLocked(true)
		}

		if (!visible) {
			getDecryptedCredential(true, getUserAgent()).then((isAllowed) => {
				if (isAllowed) {
					setVisible(true)
				} else {
					setShowSnackbar(true)
				}
			})
		} else {
			setVisible(false)
		}
	}

	const toggleLock = () => {
		if (locked) {
			getDecryptedCredential(true, getUserAgent()).then((isAllowed) => {
				if (isAllowed) {
					if (!visible && locked) {
						setVisible(true)
					}

					setLocked(false)
				} else {
					setShowSnackbar(true)
				}

				setIsAuthenticated(true)
			})
		} else {
			setLocked(true)
		}
	}

	const getUserAgent = () => {
		const userAgentInfo = navigator.userAgent

		const multipleStrings = userAgentInfo.split("(")

		const finalStrings = multipleStrings[1].split(")")

		return finalStrings[0]
	}

	return (
		<>
			<Grid item xs={12} md={3}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={3}>
							<Grid item className={classes.title}>
								<Typography variant="h6">{credentialP.company_name}</Typography>
							</Grid>
							<Grid item className={classes.lockIcon}>
								<GoBackBtn />
							</Grid>
						</Grid>
					</Grid>
					{credential.description && (
						<Grid item xs={12}>
							<Typography variant="body1">{credential.description}</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<Typography variant="body2">
									{translate("credential_info", lng, 0)}:
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="body2">
									{credentialP.created_at}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<Typography variant="body2">
									{translate("credential_info", lng, 1)}:
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="body2">
									{credentialP.updated_at}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<Typography variant="body2">
									{translate("credential_info", lng, 2)}:
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="body2">
									{credentialP.last_seen}
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Grid container justify="space-around">
							<Grid item>
								<DisplayData toggleDisplay={toggleVisibility} visible={visible} />
							</Grid>
							{isAuthenticated && (
								<Grid item>
									<DeleteCredential credentialId={credentialP.id} />
								</Grid>
							)}
							<Grid item className={classes.lockIcon}>
								<UnlockData
									toggleLock={toggleLock}
									locked={locked}
									lockedTitle={translate("access_management", lng, 3)}
									unlockedTitle={translate("access_management", lng, 2)}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{/* <Grid item xs={12} md={9}>
				<Grid container spacing={4}>
					<ShowInfo credential={credential} visible={visible} locked={locked} />
				</Grid>
			</Grid> */}

			{showSnackbar && (
				<Snackbar
					open={showSnackbar}
					message={translate("access_denied_message", lng)}
					duration={12000}
				/>
			)}
		</>
	)
}
export default ShowCredential
