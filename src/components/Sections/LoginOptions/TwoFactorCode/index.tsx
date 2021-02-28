import React from "react"
import { Box, Grid, TextField, Button } from "@material-ui/core"

const TwoFactorCode = ({ testing }: { testing?: boolean }) => {
	return (
		<Box component="div" style={{ marginTop: 15 }}>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12}>
					<TextField variant="outlined" label="Email" fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField variant="outlined" label="Verification Code" fullWidth />
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

export default TwoFactorCode
