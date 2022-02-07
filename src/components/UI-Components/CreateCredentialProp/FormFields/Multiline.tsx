import { FC, ChangeEvent } from "react"

import { Typography, TextField } from "@material-ui/core"

import useStyles from "../styles"

const Multiline: FC<Props> = ({
	mainText,
	mainCharCount,
	maxChar,
	label,
	layout,
	handleChange,
}) => {
	const classes = useStyles()

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
}

type Props = {
	mainText: string
	mainCharCount: number
	maxChar: number | undefined
	label: string
	layout: "text field" | "select option" | "multiline" | "multiple codes" | "sqa"
	handleChange: (event: ChangeEvent<{ value: unknown }>) => void
}

export default Multiline
