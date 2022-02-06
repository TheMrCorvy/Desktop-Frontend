import { FC, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { Button, Container, Grid, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { clearCredential, editCredential } from "../../redux/actions/credentialActions"
import { showError } from "../../redux/actions/errorHandlingActions"
import { translate } from "../../lang"

import { CompanyT, AccessCredentialPropT, ApiCallI, CredentialT } from "../../misc/types"
import calcMaxChar from "../../hooks/useMaxChars"
import getUserAgent from "../../hooks/useUserAgent"
import { getCompanies, getUser, putCompanies, putCredential, putUser } from "../../misc/indexedDB"
import { useApi } from "../../hooks/useApi"

import CreateCredentialProp from "../../components/UI-Components/CreateCredentialProp"
import GoBackBtn from "../../components/Utils/GoBackBtn"
import { setErrorLoading, toggleLoading } from "../../redux/actions/loadingActions"

type EditingCredential = {
	mainText: string
	secondText: string
	accessCredentialProp: AccessCredentialPropT
	editingOption: "question" | "answer" | ""
}

const CreateCredential: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { credential } = useSelector((state: RootState) => state.credential)
	const { token } = useSelector((state: RootState) => state.token)

	const dispatch = useDispatch()

	const classes = useStyles()

	const history = useHistory()

	const callApi = useApi

	const [companies, setCompanies] = useState<CompanyT[]>([
		{
			id: 0,
			name: "",
			url_logo: "",
		},
	])

	useEffect(() => {
		obtainCompanies()

		dispatch(clearCredential())
	}, [])

	const obtainCompanies = async () => {
		const data = await getCompanies()

		if (data === undefined || data.length === 0) {
			getFromApi()

			return
		}

		setCompanies(data)
	}

	const getFromApi = () => {
		const request: ApiCallI = {
			lng,
			method: "GET",
			endpoint: "/companies/index",
		}

		callApi(request).then(async (response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))
			}

			await putCompanies(response.data.companies)

			setCompanies(response.data.companies)
		})
	}

	const dispatchEditCredential = (edit: EditingCredential) => {
		let baggage = {
			oldCredential: credential,
			prop: edit.accessCredentialProp,
			newValue: "",
		}

		if (edit.editingOption === "answer") {
			baggage.prop = "security_answer"

			baggage.newValue = edit.secondText
		} else {
			baggage.newValue = edit.mainText
		}

		dispatch(editCredential(baggage))
	}

	const submitForm = () => {
		if (!token) return

		const autocomplete = document.getElementById("autocomplete-input") as HTMLInputElement

		// if (credential && autocomplete) {
		// 	let baggage: CredentialProp = {
		// 		oldCredential: credential,
		// 		prop: "company_name",
		// 		newValue: autocomplete.value,
		// 	}

		// 	dispatch(editCredential(baggage))
		// }
		dispatch(toggleLoading(true))

		const request: ApiCallI = {
			lng,
			endpoint: "/credential/create",
			method: "POST",
			body: {
				...credential,
				company_name: autocomplete.value,
				accessing_device: getUserAgent(),
				accessing_platform: "web",
			},
			token,
		}

		callApi(request).then((response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))
			} else {
				dispatch(toggleLoading(false))

				updateIndexedDB(response.data.credential)
			}
		})
	}

	const updateIndexedDB = async (credential: CredentialT) => {
		const user = await getUser()

		if (user === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		if (user.role === "free" || user.role === "semi-premium") {
			const updatedUser = await putUser({
				...user,
				slots_available: user.slots_available - 1,
			})

			if (updatedUser === undefined) {
				dispatch(showError(translate("error_messages", lng, 0)))

				return
			}
		}

		const updatedCredential = await putCredential(credential)

		if (updatedCredential === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		history.push("/view-credential/" + credential.id)
	}

	return (
		<>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h2">{translate("create_credential", lng)}</Typography>
					</Grid>
					<Grid item xs={12} className={classes.textCenter}>
						<GoBackBtn />
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							layout="select option"
							companies={companies}
							label={translate("select_company", lng)}
							isMandatory
							defaultExpanded
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="company_name"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							defaultExpanded
							label={translate("description", lng)}
							layout="multiline"
							maxChar={calcMaxChar("lg")}
							accessCredentialProp="description"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("auth_form_texts", lng, 14)}
							layout="text field"
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="user_name"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("auth_form_texts", lng, 0)}
							layout="text field"
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="email"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("auth_form_texts", lng, 12)}
							layout="text field"
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="username"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("auth_form_texts", lng, 11)}
							layout="text field"
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="password"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("auth_form_texts", lng, 7)}
							layout="text field"
							maxChar={calcMaxChar("xs")}
							accessCredentialProp="phone_number"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("encryption_examples", lng, 10)}
							layout="sqa"
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="security_question"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("auth_form_texts", lng, 13)}
							layout="text field"
							maxChar={calcMaxChar("xs")}
							accessCredentialProp="unique_code"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("encryption_examples", lng, 8)}
							layout="multiple codes"
							accessCredentialProp="multiple_codes"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("encryption_examples", lng, 9)}
							layout="multiple codes"
							isCrypto={true}
							accessCredentialProp="crypto_codes"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={7} className={classes.textCenter}>
						<Button
							color="secondary"
							variant="contained"
							disableElevation
							fullWidth
							size="large"
							className={classes.submitBtn}
							onClick={submitForm}
						>
							{translate("save", lng)}
						</Button>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default CreateCredential
