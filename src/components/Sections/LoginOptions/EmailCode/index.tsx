import React, { useState } from "react"
import {
	Box,
	Grid,
	Button,
	InputAdornment,
	OutlinedInput,
	InputLabel,
	FormControl,
	Input,
	Typography,
} from "@material-ui/core"

import TimerButton from "../../../TimerButton"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

type FormInputs = {
	mainEmail: string
	recoveryEmail: string
}

type Props = {
	isRecovery: boolean
	isRobot: boolean
	testing?: boolean
}

const EmailCode = ({ testing, isRobot, isRecovery }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [canSubmit, setCanSubmit] = useState(false)

	const { register, errors, handleSubmit } = useForm()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)
	const emailPattern = {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: translate("form_validation_messages", lng, 3),
	}

	const onSubmit = (data: FormInputs) => {
		if (testing) return

		console.log("production api call")
		console.log(data)
	}

	const sendEmail = () => {
		if (testing) return

		setCanSubmit(true)
		console.log("sending email...")
	}

	return (
		<Box
			component="div"
			data-testid={!isRecovery ? "test_main_email_form" : "test_recovery_email_form"}
		>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid
						container
						justify="center"
						spacing={3}
						component="form"
						onSubmit={handleSubmit(onSubmit)}
					>
						{isRecovery && (
							<Grid item xs={12}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel>{translate("auth_form_texts", lng, 2)}</InputLabel>
									<OutlinedInput
										label={translate("auth_form_texts", lng, 2)}
										name="mainEmail"
										required
										type="email"
										inputProps={{
											"data-testid": "test_main_email",
											ref: register({
												required: {
													value: true,
													message: requiredMessage,
												},
												maxLength: {
													value: 50,
													message: maxCharMessage,
												},
												minLength: {
													value: 5,
													message: minCharMessage,
												},
												pattern: emailPattern,
											}),
										}}
										error={errors?.mainEmail ? true : false}
									/>
									{errors.mainEmail && (
										<Typography variant="body2">
											{errors.mainEmail.message}
										</Typography>
									)}
								</FormControl>
							</Grid>
						)}
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>
									{isRecovery
										? translate("auth_form_texts", lng, 3)
										: translate("auth_form_texts", lng, 0)}
								</InputLabel>
								<OutlinedInput
									label={
										isRecovery
											? translate("auth_form_texts", lng, 3)
											: translate("auth_form_texts", lng, 0)
									}
									name="recoveryEmail"
									required
									type="email"
									inputProps={{
										ref: register({
											required: {
												value: true,
												message: requiredMessage,
											},
											maxLength: {
												value: 50,
												message: maxCharMessage,
											},
											minLength: {
												value: 5,
												message: minCharMessage,
											},
											pattern: emailPattern,
										}),
									}}
									error={errors?.recoveryEmail ? true : false}
									endAdornment={
										<InputAdornment position="end" onClick={sendEmail}>
											{isRobot ? (
												<Button size="small" disabled variant="contained">
													{translate("send_email", lng)}
												</Button>
											) : (
												<TimerButton title={translate("send_email", lng)} />
											)}
										</InputAdornment>
									}
								/>
								{errors.recoveryEmail && (
									<Typography variant="body2">
										{errors.recoveryEmail.message}
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{translate("auth_form_texts", lng, 1)}</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, 1)}
									name="recoveryEmail"
									required
									type="email"
									inputProps={{
										"data-testid": "test_verification_code",
										ref: register({
											required: {
												value: true,
												message: requiredMessage,
											},
											maxLength: {
												value: 6,
												message: maxCharMessage,
											},
											minLength: {
												value: 6,
												message: minCharMessage,
											},
										}),
									}}
									error={errors?.recoveryEmail ? true : false}
									endAdornment={
										<InputAdornment position="end" onClick={sendEmail}>
											{isRobot ? (
												<Button size="small" disabled variant="contained">
													{translate("send_email", lng)}
												</Button>
											) : (
												<TimerButton title={translate("send_email", lng)} />
											)}
										</InputAdornment>
									}
								/>
								{errors.recoveryEmail && (
									<Typography variant="body2">
										{errors.recoveryEmail.message}
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								disableElevation
								disabled={!canSubmit}
								onSubmit={handleSubmit(onSubmit)}
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

export default EmailCode
