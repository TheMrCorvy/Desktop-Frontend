import React, { FC, useState, useEffect } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
	Grid,
	AccordionActions,
	Button,
	Divider,
} from "@material-ui/core"

import Autocomplete from "@material-ui/lab/Autocomplete"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { AccessCredentialPropT } from "../../misc/types"

import CopyText from "../CopyText"

type Props = {
	label: string
	locked: boolean
	visible: boolean
	propName: AccessCredentialPropT
	isCrypto?: boolean
	maxChar?: number
}

type PossibleStates = string | number | string[] | null | undefined

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

const VisualizeCredentialProp: FC<Props> = (props) => {
	const { label, locked, visible, propName, isCrypto, maxChar } = props

	const { credential } = useSelector((state: RootState) => state.credential)
	const { lng } = useSelector((state: RootState) => state.lng)

	const [mainValue, setMainValue] = useState<PossibleStates>("")

	const [secondValue, setSecondValue] = useState<PossibleStates>("")

	const [credCodes, setCredCodes] = useState<PossibleStates>([""])

	const [mainMaxChar, setMainMaxChar] = useState(0)

	const [secondMaxchar, setSecondMaxChar] = useState(0)

	const classes = useStyles()

	const textToCopy = (): string => {
		if (isCrypto && propName === "crypto_currency_access_codes") {
			if (credential.crypto_currency_access_codes) {
				return credential.crypto_currency_access_codes.join(" ")
			}
		}

		if (credential.multiple_security_code && propName === "multiple_security_code") {
			return credential.multiple_security_code[0]
		}

		if (typeof credential[propName] === "string" && credential[propName] !== undefined) {
			return credential[propName] as string
		}

		return ""
	}

	useEffect(() => {
		if (propName === "security_question") {
			setMainValue(credential.security_question)

			setSecondValue(credential.security_answer)
		} else if (
			propName === "crypto_currency_access_codes" ||
			propName === "multiple_security_code"
		) {
			setCredCodes(credential[propName])
		} else {
			setMainValue(credential[propName])
		}

		if (maxChar) {
			setMainMaxChar(maxChar)
			setSecondMaxChar(maxChar)
		}
	}, [credential])

	const renderLayout = () => {
		if (propName === "description") {
			return "multiline"
		}

		if (propName === "multiple_security_code" || propName === "crypto_currency_access_codes") {
			return "multiple codes"
		}

		if (propName === "security_question") {
			return "sqa"
		}

		return "text field"
	}

	const cardFooter = () => {
		if (!locked || visible) {
			return (
				<>
					<Divider />
					<AccordionActions>
						<CopyText body={textToCopy()}>
							<Button color="secondary">{translate("actions", lng, 0)}</Button>
						</CopyText>
					</AccordionActions>
				</>
			)
		}

		return null
	}

	return (
		<>
			<Grid item xs={12} md={4}>
				<Accordion defaultExpanded style={{ borderRadius: 8 }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>{label}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container spacing={4}>
							{propName === "security_question" ? (
								renderLayout()
							) : (
								<Grid item xs={12}>
									{renderLayout()}
								</Grid>
							)}
						</Grid>
					</AccordionDetails>
					{cardFooter()}
				</Accordion>
			</Grid>
		</>
	)
}

export default VisualizeCredentialProp
