import { FC, ChangeEvent } from "react"

import { Typography, TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { CompanyT } from "../../../../misc/types"

const SelectOption: FC<Props> = ({
	mainText,
	mainCharCount,
	label,
	handleChange,
	layout,
	maxChar,
	companies,
}) => {
	let options: CompanyT[]

	if (companies) {
		options = companies.sort((a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0)))
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
}

type Props = {
	mainText: string
	mainCharCount: number
	maxChar: number | undefined
	label: string
	layout: "text field" | "select option" | "multiline" | "multiple codes" | "sqa"
	handleChange: (event: ChangeEvent<{ value: unknown }>) => void
	companies: CompanyT[] | undefined
}

export default SelectOption
