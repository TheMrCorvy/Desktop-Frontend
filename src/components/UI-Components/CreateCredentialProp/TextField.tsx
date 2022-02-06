import { FC } from "react"

const TextField: FC = () => {
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
}

export default TextField
