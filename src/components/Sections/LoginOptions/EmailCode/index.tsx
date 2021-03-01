import React from "react"
import {
	Box,
	Grid,
	Button,
	InputAdornment,
	OutlinedInput,
	InputLabel,
	FormControl,
} from "@material-ui/core"
import TimerButton from "../../../TimerButton"

type Props = {
	isRecovery: boolean
	testing?: boolean
}

const EmailCode = ({ testing, isRecovery }: Props) => {
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
					<Grid container justify="center" spacing={3}>
						{isRecovery && (
							<Grid item xs={12}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel htmlFor="outlined-adornment-password">
										Main Email
									</InputLabel>
									<OutlinedInput label="Main Email" />
								</FormControl>
							</Grid>
						)}
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">
									Email to send code
								</InputLabel>
								<OutlinedInput
									label="Email to send code"
									endAdornment={
										<InputAdornment position="end" onClick={handleClick}>
											<TimerButton title="enviar email" />
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">
									VerificationCode
								</InputLabel>
								<OutlinedInput label="VerificationCode" />
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" fullWidth disableElevation>
								Primary
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default EmailCode
