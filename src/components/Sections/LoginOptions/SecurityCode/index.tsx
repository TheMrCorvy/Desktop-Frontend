import React, { useState } from "react"
import {
	Box,
	Grid,
	Button,
	OutlinedInput,
	InputLabel,
	FormControl,
	Typography,
} from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

const SecurityCode = ({ isRobot, testing }: { isRobot: boolean; testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const handleClick = () => {
		if (testing) {
			console.log("hola mundo")
		} else {
			console.log("production api call")
		}
	}

	return (
		<Box component="div" data-testid="test_security_code_form">
			<Grid item xs={12}>
				<Grid container justify="center" spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel htmlFor="outlined-adornment-password">
								{translate("auth_form_texts", lng, 2)}
							</InputLabel>
							<OutlinedInput label={translate("auth_form_texts", lng, 2)} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel htmlFor="outlined-adornment-password">
								{translate("auth_form_texts", lng, 3)}
							</InputLabel>
							<OutlinedInput label={translate("auth_form_texts", lng, 3)} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel htmlFor="outlined-adornment-password">
								{translate("auth_form_texts", lng, 4)}
							</InputLabel>
							<OutlinedInput label={translate("auth_form_texts", lng, 4)} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel htmlFor="outlined-adornment-password">
								{translate("auth_form_texts", lng, 5)}
							</InputLabel>
							<OutlinedInput label={translate("auth_form_texts", lng, 5)} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							disableElevation
							disabled={isRobot}
						>
							{translate("navbar_login_btn", lng)}
						</Button>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<Typography variant="body2" component="small">
							{translate("before_using_security_code", lng)}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default SecurityCode
