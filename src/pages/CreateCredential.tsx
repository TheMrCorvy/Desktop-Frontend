import React, { FC, useEffect, useState } from "react"

import { Button, Container, Grid, Typography } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import { clearCredential, editCredential } from "../redux/actions/credentialActions"

import { CompanyT, AccessCredentialPropT } from "../misc/types"

import { companies4Testing } from "../misc/Data4Testing"

import { getCompanies, putCompanies } from "../misc/indexedDB"

import CreateCredentialProp from "../components/CreateCredentialProp"

import { calcMaxChar } from "../misc/staticData"
import { translate } from "../lang"

type EditingCredential = {
	mainText: string
	secondText: string
	accessCredentialProp: AccessCredentialPropT
	editingOption: "question" | "answer" | ""
}

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
		textCenter: {
			textAlign: "center",
		},
		submitBtn: {
			borderRadius: 8,
			marginTop: 30,
		},
	})
)

const CreateCredential: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { credential } = useSelector((state: RootState) => state.credential)

	const dispatch = useDispatch()

	const classes = useStyles()

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

	useEffect(() => {
		console.log(credential)
	}, [credential])

	const obtainCompanies = async () => {
		const data = await getCompanies()

		if (data === undefined || data.length === 0) {
			//call the api

			setCompanies(companies4Testing)

			//since the companies are not an essential thing, I don't think its necessary to handle the errors too much
			await putCompanies(companies4Testing)

			return
		}

		setCompanies(data)
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

	return (
		<>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h2">{translate("create_credential", lng)}</Typography>
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
							label={translate("auth_form_texts", lng, 11)}
							layout="text field"
							maxChar={calcMaxChar("sm")}
							accessCredentialProp="password"
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
							accessCredentialProp="unique_security_code"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("encryption_examples", lng, 8)}
							layout="multiple codes"
							accessCredentialProp="multiple_security_code"
							editCredentialProp={dispatchEditCredential}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label={translate("encryption_examples", lng, 9)}
							layout="multiple codes"
							isCrypto={true}
							accessCredentialProp="crypto_currency_access_codes"
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
