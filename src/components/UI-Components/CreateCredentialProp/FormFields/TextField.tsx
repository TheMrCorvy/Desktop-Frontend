import { FC, ChangeEvent } from "react"

import { Typography, TextField as MuiTextField } from "@material-ui/core"
import useStyles from "../styles"

const TextField: FC<Props> = ({
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
			<MuiTextField
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
}

type Props = {
	mainText: string
	mainCharCount: number
	maxChar: number | undefined
	label: string
	layout: "text field" | "select option" | "multiline" | "multiple codes" | "sqa"
	handleChange: (event: ChangeEvent<{ value: unknown }>) => void
}

export default TextField
