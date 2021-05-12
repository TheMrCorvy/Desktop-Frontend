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
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		column: {
			flexBasis: "100%",
		},
		textColor: {
			color: theme.palette.type === "dark" ? "white" : "black",
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
					<Grid item xs={12} md={6} lg={4}>
						<Accordion defaultExpanded style={{ borderRadius: 8 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
									<Typography className={classes.heading}>'label'</Typography>
								</div>
							</AccordionSummary>
							<AccordionDetails>
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
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion defaultExpanded style={{ borderRadius: 8 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
									<Typography className={classes.heading}>
										select company
									</Typography>
								</div>
							</AccordionSummary>
							<AccordionDetails>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									fullWidth
									options={companies.sort(
										(a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
									)}
									groupBy={(option) => option.name.charAt(0)}
									getOptionLabel={(option) => option.name}
									renderInput={(params) => (
										<TextField
											{...params}
											label="freeSolo"
											margin="normal"
											variant="outlined"
										/>
									)}
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Accordion defaultExpanded style={{ borderRadius: 8 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
									<Typography className={classes.heading}>'label'</Typography>
								</div>
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
						<Accordion defaultExpanded style={{ borderRadius: 8 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
									<Typography className={classes.heading}>'label'</Typography>
								</div>
							</AccordionSummary>
							<AccordionDetails>
								<TextField
									label="label"
									variant="outlined"
									fullWidth
									multiline
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
						<Accordion defaultExpanded style={{ borderRadius: 8 }}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
									<Typography className={classes.heading}>'label'</Typography>
								</div>
							</AccordionSummary>
							<AccordionDetails>
								<EditCodes codes={[""]} option={2} />
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default CreateCredential
