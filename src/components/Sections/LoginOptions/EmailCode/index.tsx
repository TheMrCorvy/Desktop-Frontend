import React, { useState, useEffect } from "react"
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
import TimerButton from "../../../TimerButton"

const EmailCode = ({ testing }: { testing?: boolean }) => {
	const [time, setTime] = useState(0)

	const [timerIsOn, setTimerIsOn] = useState(false)

	useEffect(() => {
		if (time === 0) {
			setTimerIsOn(false)

			return
		} else {
			if (timerIsOn) {
				const timer = setTimeout(() => {
					setTime(time - 1)
				}, 1000)
				return () => {
					clearTimeout(timer)
				}
			} else {
				return
			}
		}
	}, [time])

	const startCountDown = () => {
		setTimerIsOn(true)
		setTime(50)
	}

	const handleClick = () => console.log("hola mundo")

	return (
		<Box component="div" style={{ marginTop: 15 }}>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid container justify="center" spacing={3}>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
								<OutlinedInput
									label="Email"
									endAdornment={
										<InputAdornment position="end" onClick={handleClick}>
											<TimerButton />
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
