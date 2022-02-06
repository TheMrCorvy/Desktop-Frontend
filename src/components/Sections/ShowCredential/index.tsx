import { FC } from "react"

import { Grid, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import useCredentialFunctions from "./useCredentialFunctions"

import UnlockData from "../../Utils/UnlockData"
import DisplayData from "../../Utils/DisplayData"
import GoBackBtn from "../../Utils/GoBackBtn"
import DeleteCredential from "../../UI-Components/DeleteCredential"
import Snackbar from "../../Utils/Snackbar"
import CredentialProp from "./CredentialProp"

const ShowCredential: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { credential } = useSelector((state: RootState) => state.credential)
	const { token } = useSelector((state: RootState) => state.token)

	const { REACT_APP_ENV_LOCAL } = process.env

	const classes = useStyles()
	const dispatch = useDispatch()

	const {
		locked,
		visible,
		isAuthenticated,
		showSnackbar,
		snackbarMessage,
		toggleVisibility,
		toggleLock,
	} = useCredentialFunctions({ dispatch, lng, credential, token })

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
								<GoBackBtn
									altText={!locked ? translate("go_back", lng, 1) : undefined}
									altColor={!locked ? "primary" : undefined}
								/>
							</Grid>
						</Grid>
					</Grid>

					<CredentialProp
						propName="description"
						label={translate("description", lng)}
						maxChar="xl"
						locked={locked}
						visible={visible}
						credential={credential}
					/>

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
									testing={REACT_APP_ENV_LOCAL ? true : false}
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
					<CredentialProp
						propName="user_name"
						label={translate("auth_form_texts", lng, 14)}
						locked={locked}
						visible={visible}
						credential={credential}
					/>
					<CredentialProp
						propName="email"
						label={translate("auth_form_texts", lng, 0)}
						locked={locked}
						visible={visible}
						credential={credential}
					/>
					<CredentialProp
						propName="username"
						label={translate("auth_form_texts", lng, 12)}
						locked={locked}
						visible={visible}
						credential={credential}
					/>
					<CredentialProp
						propName="password"
						label={translate("auth_form_texts", lng, 11)}
						locked={locked}
						visible={visible}
						credential={credential}
					/>
					<CredentialProp
						propName="phone_number"
						label={translate("auth_form_texts", lng, 7)}
						locked={locked}
						visible={visible}
						credential={credential}
					/>
					<CredentialProp
						propName="security_question"
						label={translate("encryption_examples", lng, 10)}
						locked={locked}
						visible={visible}
						credential={credential}
					/>
					<CredentialProp
						propName="unique_code"
						label={translate("auth_form_texts", lng, 13)}
						locked={locked}
						visible={visible}
						credential={credential}
						maxChar="xs"
					/>
					<CredentialProp
						propName="multiple_codes"
						label={translate("encryption_examples", lng, 8)}
						locked={locked}
						visible={visible}
						credential={credential}
						maxChar="xs"
					/>
					<CredentialProp
						propName="crypto_codes"
						label={translate("encryption_examples", lng, 9)}
						locked={locked}
						visible={visible}
						credential={credential}
						maxChar="xs"
						isCrypto
					/>
				</Grid>
			</Grid>

			{showSnackbar && (
				<Snackbar open={showSnackbar} message={snackbarMessage} duration={12000} />
			)}
		</>
	)
}

/**
 * @alias Section_ShowCredential
 *
 * @description This is the section that will show all the properties that a credential has, one each, using the {@link VisualizeCredentialProp} component
 *
 * @property {Function} getDecryptedCredential This function receives 2 params: 1- decrypted: true alweys, 2- agent: string (the user agent which is obtained inside of this component)
 */

export default ShowCredential
