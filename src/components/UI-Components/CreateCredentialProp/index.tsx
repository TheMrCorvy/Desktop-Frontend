import { FC, useState, useEffect, ChangeEvent } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
	Grid,
} from "@material-ui/core"

import Autocomplete from "@material-ui/lab/Autocomplete"

import useStyles from "./styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import { AccessCredentialPropT, CompanyT } from "../../../misc/types"

import EditCodes from "../EditCodes"

const CreateCredentialProp: FC<Props> = (props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const {
		layout,
		label,
		isMandatory,
		defaultExpanded,
		companies,
		maxChar,
		isCrypto,
		accessCredentialProp,
		editCredentialProp,
	} = props

	const [mainCharCount, setMainCharCount] = useState(0)
	const [secondCharCount, setSecondCharCount] = useState(0)
	const [mainText, setMainText] = useState("")
	const [secondText, setSecondText] = useState("")
	const [editingOption, setEditingOption] = useState<"question" | "answer" | "">("")

	const classes = useStyles()

	useEffect(() => {
		const edits: ExportEdits = {
			mainText,
			secondText,
			accessCredentialProp,
			editingOption,
		}

		editCredentialProp(edits)
	}, [mainText, secondText])

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

					setEditingOption("question")
				}

				if (variant && variant === "security answer") {
					setSecondText(target.value)

					setSecondCharCount(target.value.length)

					setEditingOption("answer")
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
								spellCheck: "false",
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
							id="autocomplete-input"
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
										spellCheck: "false",
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
								spellCheck: "false",
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
									spellCheck: "false",
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
									spellCheck: "false",
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

type LayoutOptions = "text field" | "select option" | "multiline" | "multiple codes" | "sqa"

type ExportEdits = {
	mainText: string
	secondText: string
	accessCredentialProp: AccessCredentialPropT
	editingOption: "question" | "answer" | ""
}

type Props = {
	layout: LayoutOptions
	label: string
	accessCredentialProp: AccessCredentialPropT
	editCredentialProp: (edits: ExportEdits) => void
	isMandatory?: boolean
	defaultExpanded?: boolean
	companies?: CompanyT[]
	maxChar?: number
	isCrypto?: boolean
}

/**
 * @alias CreateCredentialProp
 *
 * @description This component will be the card that shows the suer the inputs they must / should complete to register their credential, and will update the global state, where the credential is.
 *
 *@property {"text field" | "select option" | "multiline" | "multiple codes" | "sqa"} layoutOptions All the possible inputs for the credential props
 *
 * @property {string} label The input's label
 *
 * @property {AccessCredntialPropT} accessCredentialProp The name of the property the user will be editing
 * 
 * @property {function} editCredentialProp This function will dispatch an event to update the state of the credencial when the user changes anything
 *
 * @property {boolean} [isMandatory] If the user MUST complete this input
 *
 * @property {boolean} [defaultExpanded] If the card is open before the user does anything
 *
 * @property {CompanyT[]} [companies] An array of all the available companies for the user to select
 *
 * @property {number} maxChar The max amount of characters per input
 *
 * @property {boolean} isCrypto If the input is for crypto currency access words
 *
 * @example
 * 
 * <CreateCredentialProp
		label="your security question & answer"
		layout="sqa"
		maxChar={191}
		accessCredentialProp="security_question"
		editCredentialProp={dispatchEditCredential}
	/>

	@example
	<CreateCredentialProp
		layout="select option"
		companies={["", ""]}
		label="select one or write your own"
		isMandatory
		defaultExpanded
		maxChar={50}
		accessCredentialProp="company_name"
		editCredentialProp={dispatchEditCredential}
	/>
 */

export default CreateCredentialProp
