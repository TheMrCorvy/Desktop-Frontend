import React from "react"
import { Box, Grid, FormControl, InputLabel, OutlinedInput, Button } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

const TwoFactorCode = ({ testing }: { testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const handleClick = () => {
		if (testing) {
			console.log("hola mundo")
		} else {
			console.log("production api call")
		}
	}

	return (
		<Box component="div" style={{ marginTop: 15 }}>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">
									{translate("auth_form_texts", lng, 0)}
								</InputLabel>
								<OutlinedInput label={translate("auth_form_texts", lng, 0)} />
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">
									{translate("auth_form_texts", lng, 1)}
								</InputLabel>
								<OutlinedInput label={translate("auth_form_texts", lng, 1)} />
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								disableElevation
								onClick={handleClick}
							>
								{translate("navbar_login_btn", lng)}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default TwoFactorCode
