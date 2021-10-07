import { FC, ChangeEvent, useState, useEffect } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
	Grid,
	Chip,
	useMediaQuery,
} from "@material-ui/core"

import { useTheme } from "@material-ui/core/styles"
import useStyles from "./styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { editCredential } from "../../redux/actions/credentialActions"

import { translate } from "../../lang"

import { AccessCredentialPropT } from "../../misc/types"

import CardFooter from "./CardFooter"
import EditCodes from "../EditCodes"

type Props = {
	label: string
	locked: boolean
	visible: boolean
	propName: AccessCredentialPropT
	isCrypto?: boolean
	maxChar?: number
}

/**
 * @alias VisualizeCredentialProp
 *
 * @description This component will show dynamically the appropiate input / component that the credential property requires.
 *
 * @property {string} label The label's text for the card
 *
 * @property {boolean} locked The state of the inputs, if the user can edit or not
 *
 * @property {boolean} visible The state of the view, if the suer can see the decrypted credential.
 *
 * @property {AccessCredentialPropT} propName This is the name to access the property of the credential stored on the global state.
 *
 * @property {boolean} [isCrypto] If the property is the cyprto currency access words
 *
 * @property {number} [maxChar] The amount of char that the user is allowed to write on the inputs
 */

const VisualizeCredentialProp: FC<Props> = (props) => {
	const { label, locked, visible, propName, isCrypto, maxChar } = props

	const { credential } = useSelector((state: RootState) => state.credential)
	const { lng } = useSelector((state: RootState) => state.lng)

	const [mainCharCount, setMainCharCount] = useState<number | null | undefined>(0)

	const [secondCharCount, setSecondCharCount] = useState<number | null | undefined>(0)

	const classes = useStyles()
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down("sm"))

	const dispatch = useDispatch()

	const textToCopy = (): string => {
		if (isCrypto && propName === "crypto_codes") {
			if (credential.crypto_codes) {
				return credential.crypto_codes.join(" ")
			}
		}

		if (credential.multiple_codes && propName === "multiple_codes") {
			return credential.multiple_codes[0]
		}

		if (propName === "security_question") {
			return credential.security_answer ? credential.security_answer : ""
		}

		if (typeof credential[propName] === "string" && credential[propName] !== undefined) {
			return credential[propName] ? (credential[propName] as string) : ""
		}

		return ""
	}

	useEffect(() => {
		const mainChar = credential[propName] as string

		const secondChar = credential.security_answer

		setMainCharCount(mainChar ? mainChar.length : 0)

		setSecondCharCount(secondChar ? secondChar.length : 0)
	}, [credential])

	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		const target = event.target as HTMLInputElement

		const variant = target.getAttribute("variant")

		if (variant === "main text") {
			setMainCharCount(target.value.length)

			dispatch(
				editCredential({
					oldCredential: credential,
					prop: propName,
					newValue: target.value,
				})
			)
		}

		if (variant === "second text") {
			setSecondCharCount(target.value.length)

			dispatch(
				editCredential({
					oldCredential: credential,
					prop: "security_answer",
					newValue: target.value,
				})
			)
		}
	}

	const renderLayout = () => {
		const mainChar = credential[propName] ? credential[propName] : ""

		const secondChar = credential.security_answer ? credential.security_answer : ""

		if (propName === "description" && locked) {
			return (
				<Typography variant="body1" data-testid="test_description">
					{credential.description}
				</Typography>
			)
		}

		if (propName === "multiple_codes" || propName === "crypto_codes") {
			const codes = isCrypto ? credential.crypto_codes : credential.multiple_codes

			const showCodesLabel = (number: number, code: string) => {
				if ((isCrypto && visible) || (isCrypto && !locked)) {
					return number + 1 + ") " + code
				} else {
					return code
				}
			}

			return (
				<Grid container spacing={4} justify="space-around" data-testid="test_codes">
					{codes &&
						codes.map((code: string, index: number) => (
							<Grid item key={index}>
								<Chip
									icon={locked ? <LockIcon /> : <LockOpenIcon />}
									key={code}
									label={showCodesLabel(index, code)}
									color="secondary"
									disabled={!visible}
									size={matches ? "small" : "medium"}
								/>
							</Grid>
						))}
					{!locked && (
						<Grid
							item
							xs={12}
							className={classes.textCenter}
							data-testid="test_unlocked_codes"
						>
							<EditCodes
								codes={codes ? codes : [""]}
								option={1}
								isCrypto={isCrypto ? isCrypto : false}
							/>
						</Grid>
					)}
				</Grid>
			)
		}

		if (propName === "security_question") {
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
								variant: "main text",
								"data-testid": "test_security_question",
								spellCheck: "false",
							}}
							value={mainChar}
							onChange={handleChange}
							disabled={locked}
						/>
						{maxChar && visible && (
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
								variant: "second text",
								"data-testid": "test_security_answer",
								spellCheck: "false",
							}}
							value={secondChar}
							onChange={handleChange}
							disabled={locked}
						/>
						{maxChar && visible && (
							<Typography variant="body1">
								{secondCharCount} / {maxChar}
							</Typography>
						)}
					</Grid>
				</>
			)
		}

		return (
			<TextField
				label={label}
				variant="outlined"
				fullWidth
				multiline={propName === "description" ? true : false}
				className={classes.textColor}
				InputProps={{
					classes: {
						input: classes.textColor,
					},
				}}
				inputProps={{
					variant: "main text",
					"data-testid": "test_text_field",
					spellCheck: "false",
				}}
				value={mainChar}
				onChange={handleChange}
				disabled={locked}
			/>
		)
	}

	return (
		<>
			<Grid
				item
				xs={12}
				md={propName !== "description" ? 6 : 12}
				xl={propName !== "description" ? 4 : 12}
			>
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
									{maxChar && visible && (
										<Typography variant="body1" data-testid="test_max_char">
											{mainCharCount} / {maxChar}
										</Typography>
									)}
								</Grid>
							)}
						</Grid>
					</AccordionDetails>
					{propName !== "description" && visible && (
						<CardFooter
							textToCopy={textToCopy()}
							label={translate("actions", lng, 0)}
							locked={locked}
							propName={propName}
						/>
					)}
				</Accordion>
			</Grid>
		</>
	)
}

export default VisualizeCredentialProp
