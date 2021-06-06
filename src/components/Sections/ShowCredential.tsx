import React, { FC, useState, useEffect } from "react"
import { AccessCredentialPropT, CredentialT, ReduxCredentialT } from "../../misc/types"

import { Grid, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { editCredential } from "../../redux/actions/credentialActions"

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

type Baggage = {
	oldCredential: ReduxCredentialT
	prop: AccessCredentialPropT
	newValue: string
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
		initializeReduxState()
	}, [credentialP])

	useEffect(() => {
		console.log(credential)
	}, [credential])

	const initializeReduxState = async () => {
		let baggage: Baggage = {
			oldCredential: credential,
			prop: "description",
			newValue: "",
		}

		let asterisks: string

		if (credentialP.description) {
			baggage.newValue = credentialP.description

			await dispatchChanges(baggage)
		}
		if (credentialP.email) {
			asterisks = calcAsterisks(credentialP.email.char_count)

			baggage.newValue = credentialP.email.ending + asterisks + credentialP.email.ending

			baggage.prop = "email"

			await dispatchChanges(baggage)
		}
		if (credentialP.password) {
			baggage.newValue = calcAsterisks(credentialP.password.char_count)

			baggage.prop = "password"

			await dispatchChanges(baggage)
		}
		if (credentialP.phone_number) {
			asterisks = calcAsterisks(credentialP.phone_number.char_count)

			baggage.newValue =
				credentialP.phone_number.ending + asterisks + credentialP.phone_number.ending

			baggage.prop = "phone_number"

			await dispatchChanges(baggage)
		}
		if (credentialP.security_codes) {
			if (credentialP.security_codes.crypto_currency_access_code) {
				await dispatchChanges(baggage)
			}
			if (credentialP.security_codes.multiple_security_codes) {
				await dispatchChanges(baggage)
			}
			if (credentialP.security_codes.unique_security_code) {
				baggage.newValue = calcAsterisks(10)

				baggage.prop = "unique_security_code"

				await dispatchChanges(baggage)
			}
		}
		if (credentialP.security_question_answer) {
			baggage.newValue = credentialP.security_question_answer.security_answer

			baggage.prop = "security_answer"

			await dispatchChanges(baggage)

			baggage.newValue = credentialP.security_question_answer.security_question

			baggage.prop = "security_question"

			await dispatchChanges(baggage)
		}
		if (credentialP.user_name && credentialP.char_count) {
			baggage.newValue = calcAsterisks(credentialP.char_count)

			baggage.prop = "user_name"

			await dispatchChanges(baggage)
		}
		if (credentialP.username) {
			baggage.newValue = calcAsterisks(credentialP.username.char_count)

			baggage.prop = "username"

			await dispatchChanges(baggage)
		}
	}

	const dispatchChanges = async (baggage: Baggage) => {
		return await Promise.resolve(dispatch(editCredential(baggage)))
	}

	const calcAsterisks = (charCount: number): string => {
		return new Array(charCount).join("•")
	}

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
					{/* {credential.description && (
						<Grid item xs={12}>
							<Typography variant="body1">{credential.description}</Typography>
						</Grid>
					)} */}
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
