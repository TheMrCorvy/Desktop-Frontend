import { FC } from "react"

import { Typography, Accordion, AccordionDetails, AccordionSummary, Grid } from "@material-ui/core"
import useStyles from "./styles"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { translate } from "../../../lang"

import { AccessCredentialPropT, CompanyT } from "../../../misc/types"

import EditCodes from "../EditCodes"
import Multiline from "./FormFields/Multiline"
import TextField from "./FormFields/TextField"
import SQA from "./FormFields/SQA"
import SelectOption from "./FormFields/SelectOption"

import useHandleChange from "./useHandleChange"

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

	const classes = useStyles()
	const { handleChange, mainCharCount, secondCharCount, mainText, secondText } = useHandleChange({
		accessCredentialProp,
		editCredentialProp,
	})

	const renderBody = (option: LayoutOptions) => {
		switch (option) {
			case "text field":
				return (
					<TextField
						mainCharCount={mainCharCount}
						mainText={mainText}
						handleChange={handleChange}
						label={label}
						layout={layout}
						maxChar={maxChar}
					/>
				)

			case "select option":
				return (
					<SelectOption
						mainCharCount={mainCharCount}
						mainText={mainText}
						handleChange={handleChange}
						label={label}
						layout={layout}
						maxChar={maxChar}
						companies={companies}
					/>
				)

			case "multiline":
				return (
					<Multiline
						mainCharCount={mainCharCount}
						mainText={mainText}
						handleChange={handleChange}
						label={label}
						layout={layout}
						maxChar={maxChar}
					/>
				)

			case "multiple codes":
				return <EditCodes codes={[""]} option={2} isCrypto={isCrypto ? isCrypto : false} />

			case "sqa":
				return (
					<SQA
						mainCharCount={mainCharCount}
						mainText={mainText}
						handleChange={handleChange}
						secondCharCount={secondCharCount}
						secondText={secondText}
						layout={layout}
						maxChar={maxChar}
					/>
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
