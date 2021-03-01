import React from "react"
import {
	Box,
	Grid,
	TextField,
	Button,
	InputAdornment,
	OutlinedInput,
	InputLabel,
	FormControl,
} from "@material-ui/core"

const SecurityCode = ({ testing }: { testing?: boolean }) => {
	return (
		<Box component="div" style={{ marginTop: 15 }}>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
						<OutlinedInput label="Name" />
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-adornment-password">Main Email</InputLabel>
						<OutlinedInput label="Main Email" />
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-adornment-password">
							Recovery Email
						</InputLabel>
						<OutlinedInput label="Recovery Email" />
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-adornment-password">
							Anti Fishing Secret
						</InputLabel>
						<OutlinedInput label="Anti Fishing Secret" />
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel htmlFor="outlined-adornment-password">Security Code</InputLabel>
						<OutlinedInput label="Security Code" />
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary" fullWidth disableElevation>
						Primary
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}

export default SecurityCode
