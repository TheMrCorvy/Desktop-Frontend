import React, { FC, useState, ChangeEvent } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
	Grid,
} from "@material-ui/core"

import Autocomplete from "@material-ui/lab/Autocomplete"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { CompanyT } from "../../misc/types"

import EditCodes from "../ShowCredential/CredentialCodes/EditCodes"

type LayoutOptions = "text field" | "select option" | "multiline" | "multiple codes" | "sqa"

type Props = {
	layout: LayoutOptions
	label: string
	isMandatory?: boolean
	defaultExpanded?: boolean
	companies?: CompanyT[]
	maxChar?: number
	isCrypto?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: "80%",
			flexShrink: 0,

			[theme.breakpoints.down("xs")]: {
				flexBasis: "70%",
			},
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
	const { lng } = useSelector((state: RootState) => state.lng)

	const { layout, label, isMandatory, defaultExpanded, companies, maxChar, isCrypto } = props

	const [mainCharCount, setMainCharCount] = useState(0)

	const [secondCharCount, setSecondCharCount] = useState(0)

	const [mainText, setMainText] = useState("")

	const [secondText, setSecondText] = useState("")

	const classes = useStyles()

	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		const target = event.target as HTMLInputElement

		const inputType = target.getAttribute("type")

		const variant = target.getAttribute("variant")

		switch (inputType) {
			case "text field":
				setMainText(target.value)

				setMainCharCount(target.value.length)
				break

			case "select option":
				setMainText(target.value)

				setMainCharCount(target.value.length)
				break

			case "multiline":
				setMainText(target.value)

				setMainCharCount(target.value.length)
				break

			case "sqa":
				if (variant && variant === "security question") {
					setMainText(target.value)

					setMainCharCount(target.value.length)
				}

				if (variant && variant === "security answer") {
					setSecondText(target.value)

					setSecondCharCount(target.value.length)
				}

				break

			default:
				break
		}
	}

	const renderBody = (option: LayoutOptions) => {
		switch (option) {
			case "text field":
				return (
					<>
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
							inputProps={{
								type: layout,
								"data-testid": "test_text_field",
							}}
							value={mainText}
							onChange={handleChange}
						/>
						{maxChar && (
							<Typography variant="body1" data-testid="test_max_char">
								{mainCharCount} / {maxChar}
							</Typography>
						)}
					</>
				)

			case "select option":
				let options: CompanyT[]

				if (companies) {
					options = companies.sort(
						(a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
					)
				} else {
					options = [
						{
							id: 0,
							name: "",
							url_logo: "",
						},
					]
				}

				return (
					<>
						<Autocomplete
							freeSolo
							data-testid="test_select_option"
							fullWidth
							options={options}
							groupBy={(option) => option.name.charAt(0)}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => (
								<TextField
									{...params}
									label={label}
									variant="outlined"
									value={mainText}
									onChange={handleChange}
									InputProps={{
										...params.InputProps,
										type: layout,
									}}
								/>
							)}
						/>
						{maxChar && (
							<Typography variant="body1">
								{mainCharCount} / {maxChar}
							</Typography>
						)}
					</>
				)

			case "multiline":
				return (
					<>
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
							inputProps={{
								type: layout,
								"data-testid": "test_multiline",
							}}
							value={mainText}
							onChange={handleChange}
						/>
						{maxChar && (
							<Typography variant="body1">
								{mainCharCount} / {maxChar}
							</Typography>
						)}
					</>
				)

			case "multiple codes":
				return <EditCodes codes={[""]} option={2} isCrypto={isCrypto ? isCrypto : false} />

			case "sqa":
				return (
					<>
						<Grid item xs={12}>
							<TextField
								label={translate("encryption_examples", lng, 5)}
								variant="outlined"
								fullWidth
								className={classes.textColor}
								InputProps={{
									classes: {
										input: classes.textColor,
									},
								}}
								inputProps={{
									type: layout,
									variant: "security question",
									"data-testid": "test_sqa_question",
								}}
								value={mainText}
								onChange={handleChange}
							/>
							{maxChar && (
								<Typography variant="body1">
									{mainCharCount} / {maxChar}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								label={translate("encryption_examples", lng, 6)}
								variant="outlined"
								fullWidth
								className={classes.textColor}
								InputProps={{
									classes: {
										input: classes.textColor,
									},
								}}
								inputProps={{
									type: layout,
									variant: "security answer",
									"data-testid": "test_sqa_answer",
								}}
								value={secondText}
								onChange={handleChange}
							/>
							{maxChar && (
								<Typography variant="body1">
									{secondCharCount} / {maxChar}
								</Typography>
							)}
						</Grid>
					</>
				)

			default:
				return null
		}
	}

	//don't know why, but the class "borderRadius" doesn't apply the border radius, but the style does...
	return (
		<>
			<Accordion
				defaultExpanded={defaultExpanded}
				data-testid="test_accordion"
				style={{ borderRadius: 8 }}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>{label}</Typography>
					<Typography className={classes.secondaryHeading} data-testid="test_mandatory">
						{translate("auth_form_texts", lng, isMandatory ? 16 : 15)}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={4}>
						{layout === "sqa" ? (
							renderBody(layout)
						) : (
							<Grid item xs={12}>
								{renderBody(layout)}
							</Grid>
						)}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</>
	)
}

export default CreateCredentialProp
