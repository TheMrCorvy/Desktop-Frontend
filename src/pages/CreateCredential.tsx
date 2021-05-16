import React, { FC, useEffect, useState } from "react"

import { Container, Grid, Typography } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { CompanyT } from "../misc/types"

import { companies4Testing } from "../misc/Data4Testing"

import { getCompanies, putCompanies } from "../misc/indexedDB"

import CreateCredentialProp from "../components/CreateCredentialProp"

import { calcMaxChar } from "../misc/staticData"

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
	})
)

const CreateCredential: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

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
	}, [])

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

	return (
		<>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h2">Create Credential</Typography>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							layout="select option"
							companies={companies}
							label="Select Company"
							isMandatory
							defaultExpanded
							maxChar={calcMaxChar("sm")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							defaultExpanded
							label="Description"
							layout="multiline"
							maxChar={calcMaxChar("lg")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Registered Name"
							layout="text field"
							maxChar={calcMaxChar("sm")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="email"
							layout="text field"
							maxChar={calcMaxChar("sm")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="password"
							layout="text field"
							maxChar={calcMaxChar("sm")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Username"
							layout="text field"
							maxChar={calcMaxChar("sm")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Phone Number"
							layout="text field"
							maxChar={calcMaxChar("xs")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Security Question & Answer"
							layout="sqa"
							maxChar={calcMaxChar("sm")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Unique Security Code"
							layout="text field"
							maxChar={calcMaxChar("xs")}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Multiple Security Codes"
							layout="multiple codes"
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<CreateCredentialProp
							label="Crypto Access"
							layout="multiple codes"
							isCrypto={true}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default CreateCredential
