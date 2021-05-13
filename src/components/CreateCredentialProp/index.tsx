import React, { FC, useState } from "react"

import {
	Container,
	Grid,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
} from "@material-ui/core"

import Autocomplete from "@material-ui/lab/Autocomplete"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { CompanyT } from "../../misc/types"

import EditCodes from "../ShowCredential/CredentialCodes/EditCodes"

type LayoutOptions = "text field" | "select option" | "multiline" | "multiple code"

type Props = {
	layout: LayoutOptions
	label: string
	isOptional: boolean
	defaultExpanded?: boolean
	companies?: CompanyT[]
	maxChar?: number
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

const CreateCredentialProp: FC<Props> = (props) => {
	const [charCount, setCharCount] = useState(0)

	const { layout, label, isOptional, defaultExpanded, companies, maxChar } = props

	const classes = useStyles()

	const sortCompanies = () => {
		if (companies) {
			return companies.sort((a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0)))
		} else {
			return [
				{
					id: 0,
					name: "",
					url_logo: "",
				},
			]
		}
	}

	const renderBody = (option: LayoutOptions) => {
		switch (option) {
			case "text field":
				return (
					<TextField
						label={label}
						variant="outlined"
						fullWidth
						className={classes.textColor}
						InputProps={{
							classes: {
								input: classes.textColor,
							},
						}}
					/>
				)
			case "select option":
				return (
					<Autocomplete
						freeSolo
						fullWidth
						options={sortCompanies()}
						groupBy={(option) => option.name.charAt(0)}
						getOptionLabel={(option) => option.name}
						renderInput={(params) => (
							<TextField {...params} label={label} variant="outlined" />
						)}
					/>
				)
			case "multiline":
				return (
					<TextField
						label={label}
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
				)
			case "multiple code":
				return <EditCodes codes={[""]} option={2} />

			default:
				return null
		}
	}

	return (
		<>
			<Accordion defaultExpanded={defaultExpanded} className={classes.borderRadius}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>{label}</Typography>
					<Typography className={classes.secondaryHeading}>
						{isOptional ? "(Optional)" : "(Mandatory)"}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>{renderBody(layout)}</AccordionDetails>
			</Accordion>
		</>
	)
}

export default CreateCredentialProp
