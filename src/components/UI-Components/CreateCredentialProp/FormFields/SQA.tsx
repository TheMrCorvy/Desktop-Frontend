import { FC, ChangeEvent } from "react"

import { Typography, TextField, Grid } from "@material-ui/core"

import useStyles from "../styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

import { translate } from "../../../../lang"

const SQA: FC<Props> = ({
	mainText,
	mainCharCount,
	maxChar,
	secondText,
	secondCharCount,
	layout,
	handleChange,
}) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

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
}

type Props = {
	mainText: string
	secondText: string
	secondCharCount: number
	mainCharCount: number
	maxChar: number | undefined
	layout: "text field" | "select option" | "multiline" | "multiple codes" | "sqa"
	handleChange: (event: ChangeEvent<{ value: unknown }>) => void
}

export default SQA
