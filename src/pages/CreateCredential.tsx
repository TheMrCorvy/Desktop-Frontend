import React, { FC, useEffect, useState } from "react"

import {
	Container,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import Autocomplete from "@material-ui/lab/Autocomplete"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import EditCodes from "../components/ShowCredential/CredentialCodes/EditCodes"
import { CompanyT } from "../misc/types"

import { companies4Testing } from "../misc/Data4Testing"

import { getCompanies, putCompanies } from "../misc/indexedDB"

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
		accordion: {
			width: "100%",
			borderRadius: 8,
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: "80%",
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		textColor: {
			color: theme.palette.type === "dark" ? "white" : "black",
		},
		textCenter: {
			textAlign: "center",
		},
		borderRadius: {
			borderRadius: 8,
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
					<Grid item xs={12} md={6} lg={4}></Grid>
					<Grid item xs={12} md={6} lg={4}></Grid>
					<Grid item xs={12} md={6} lg={4}></Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Email</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="Email"
									variant="outlined"
									fullWidth
									className={classes.textColor}
									InputProps={{
										classes: {
											input: classes.textColor,
										},
									}}
									type="email"
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Password</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="Password"
									variant="outlined"
									fullWidth
									className={classes.textColor}
									InputProps={{
										classes: {
											input: classes.textColor,
										},
									}}
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>UserName</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="UserName"
									variant="outlined"
									fullWidth
									className={classes.textColor}
									InputProps={{
										classes: {
											input: classes.textColor,
										},
									}}
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Phone Number</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="Phone Number"
									variant="outlined"
									fullWidth
									className={classes.textColor}
									InputProps={{
										classes: {
											input: classes.textColor,
										},
									}}
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>
									Unique Security Code
								</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="Unique Security Code"
									variant="outlined"
									fullWidth
									className={classes.textColor}
									InputProps={{
										classes: {
											input: classes.textColor,
										},
									}}
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>
									Security Question & Answer
								</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<TextField
											label="label"
											variant="outlined"
											fullWidth
											className={classes.textColor}
											InputProps={{
												classes: {
													input: classes.textColor,
												},
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											label="label"
											variant="outlined"
											fullWidth
											className={classes.textColor}
											InputProps={{
												classes: {
													input: classes.textColor,
												},
											}}
										/>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion className={classes.borderRadius}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>Crypto Access</Typography>
								<Typography className={classes.secondaryHeading}>
									(Optional)
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<EditCodes codes={[""]} option={2} />
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}></Grid>
				</Grid>
			</Container>
		</>
	)
}

export default CreateCredential
