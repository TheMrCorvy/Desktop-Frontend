import { FC, useState, useEffect } from "react"

import { Grid, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { initializeCredential } from "../../../redux/actions/credentialActions"

import { translate } from "../../../lang"

import { findCredential } from "../../../misc/indexedDB"
import { calcMaxChar } from "../../../misc/staticData"

import UnlockData from "../../UnlockData"
import DisplayData from "../../DisplayData"
import GoBackBtn from "../../GoBackBtn"
import DeleteCredential from "../../DeleteCredential"
import Snackbar from "../../Snackbar"
import VisualizeCredentialProp from "../../VisualizeCredentialProp"

type Props = {
	getDecryptedCredential: (decrypted: true, agent: string) => Promise<boolean>
}

/**
 * @alias Section_ShowCredential
 *
 * @description This is the section that will show all the properties that a credential has, one each, using the {@link VisualizeCredentialProp} component
 *
 * @property {Function} getDecryptedCredential This function receives 2 params: 1- decrypted: true alweys, 2- agent: string (the user agent which is obtained inside of this component)
 */

const ShowCredential: FC<Props> = ({ getDecryptedCredential }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { credential } = useSelector((state: RootState) => state.credential)

	const [locked, setLocked] = useState(true)

	const [visible, setVisible] = useState(false)

	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [showSnackbar, setShowSnackbar] = useState(false)

	const [snackbarMessage, setSnackbarMessage] = useState("")

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

	const obtainCredential = async (id: number) => {
		const data = await findCredential(id)

		if (data === undefined) {
			return undefined
		}

		return data
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

					setSnackbarMessage(translate("access_denied_message", lng))
				}
			})
		} else {
			const id = credential.id ? credential.id : 0

			id !== 0 &&
				obtainCredential(id).then((credentialDB: any) => {
					if (credentialDB) {
						setVisible(false)

						dispatch(initializeCredential(credentialDB))
					} else {
						setSnackbarMessage(translate("error_messages", lng, 3))

						setShowSnackbar(true)
					}
				})
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
								<Typography variant="h6">{credential.company_name}</Typography>
							</Grid>
							<Grid item className={classes.lockIcon}>
								<GoBackBtn />
							</Grid>
						</Grid>
					</Grid>
					{credential.description && (
						<VisualizeCredentialProp
							label="description"
							locked={locked}
							visible={visible}
							propName="description"
							maxChar={calcMaxChar("xl")}
							isCrypto
						/>
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
									{credential.created_at}
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
									{credential.updated_at}
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
									{credential.last_seen}
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Grid container justify="space-around">
							<Grid item>
								<DisplayData toggleDisplay={toggleVisibility} visible={visible} />
							</Grid>
							{isAuthenticated && credential.id && (
								<Grid item>
									<DeleteCredential credentialId={credential.id} />
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

			<Grid item xs={12} md={9}>
				<Grid container spacing={4}>
					{credential.user_name && (
						<VisualizeCredentialProp
							label={translate("auth_form_texts", lng, 14)}
							locked={locked}
							visible={visible}
							propName="user_name"
							maxChar={calcMaxChar("sm")}
						/>
					)}
					{credential.email && (
						<VisualizeCredentialProp
							label={translate("auth_form_texts", lng, 0)}
							locked={locked}
							visible={visible}
							propName="email"
							maxChar={calcMaxChar("sm")}
						/>
					)}
					{credential.password && (
						<VisualizeCredentialProp
							label={translate("auth_form_texts", lng, 11)}
							locked={locked}
							visible={visible}
							propName="password"
							maxChar={calcMaxChar("sm")}
						/>
					)}
					{credential.user_name && (
						<VisualizeCredentialProp
							label={translate("auth_form_texts", lng, 12)}
							locked={locked}
							visible={visible}
							propName="user_name"
							maxChar={calcMaxChar("sm")}
						/>
					)}
					{credential.phone_number && (
						<VisualizeCredentialProp
							label={translate("auth_form_texts", lng, 7)}
							locked={locked}
							visible={visible}
							propName="phone_number"
							maxChar={calcMaxChar("sm")}
						/>
					)}
					{credential.security_question && (
						<VisualizeCredentialProp
							label={translate("encryption_examples", lng, 10)}
							locked={locked}
							visible={visible}
							propName="security_question"
							maxChar={calcMaxChar("sm")}
						/>
					)}
					{credential.unique_security_code && (
						<VisualizeCredentialProp
							label={translate("auth_form_texts", lng, 13)}
							locked={locked}
							visible={visible}
							propName="unique_security_code"
							maxChar={calcMaxChar("xs")}
						/>
					)}
					{credential.multiple_security_code && (
						<VisualizeCredentialProp
							label={translate("encryption_examples", lng, 8)}
							locked={locked}
							visible={visible}
							propName="multiple_security_code"
						/>
					)}
					{credential.crypto_currency_access_codes && (
						<VisualizeCredentialProp
							label={translate("encryption_examples", lng, 9)}
							locked={locked}
							visible={visible}
							propName="crypto_currency_access_codes"
							isCrypto
						/>
					)}
				</Grid>
			</Grid>

			{showSnackbar && (
				<Snackbar open={showSnackbar} message={snackbarMessage} duration={12000} />
			)}
		</>
	)
}
export default ShowCredential
