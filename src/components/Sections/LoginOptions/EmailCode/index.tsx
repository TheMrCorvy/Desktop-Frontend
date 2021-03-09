import React, { useState } from "react"
import {
	Box,
	Grid,
	FormControl,
	InputLabel,
	OutlinedInput,
	Button,
	Typography,
	InputAdornment,
} from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { login } from "../../../../redux/actions/authTokenActions"

import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

import TimerButton from "../../../TimerButton"

type Props = {
	isRecovery: boolean
	isRobot: boolean
	testing?: boolean
}

type FormInputs = {
	mailToSendCode: String
	verificationCode: number
	mainEmail?: string
}

const EmailCode = ({ testing, isRobot, isRecovery }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const { register, errors, handleSubmit } = useForm()

	const [canSubmit, setCanSubmit] = useState(false)

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)
	const emailPattern = {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: translate("form_validation_messages", lng, 3),
	}

	const onSubmit = (data: FormInputs) => {
		if (testing) {
			dispatch(login("authorization token"))
		}

		console.log("production api call")
		console.log(data)
	}

	const sendEmail = () => {
		if (testing) return

		setCanSubmit(true)
		console.log("sending email...")
	}

	//I'm leaving this commented because I'm not sure if I'll allow the user to login more than 50 seconds after sending the email
	//it depents on the lifespan of the code generated on the backend

	// useEffect(() => {
	// 	if (canSubmit) {
	// 		setTimeout(() => {
	// 			setCanSubmit(false)
	// 		}, 50000)
	// 	}
	// }, [canSubmit])

	return (
		<Box
			component="div"
			data-testid={!isRecovery ? "test_main_email_form" : "test_recovery_email_form"}
		>
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid container spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
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
									{translate("auth_form_texts", lng, isRecovery ? 3 : 0)}
								</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, isRecovery ? 3 : 0)}
									name="mailToSendCode"
									required
									type="email"
									inputProps={{
										"data-testid": "test_email_to_send_code",
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
									error={errors?.mailToSendCode ? true : false}
									endAdornment={
										<InputAdornment position="end" onClick={sendEmail}>
											{isRobot ? (
												<Button size="small" disabled variant="contained">
													{translate("send_email", lng)}
												</Button>
											) : (
												<TimerButton
													title={translate("send_email", lng)}
													initialTime={50}
												/>
											)}
										</InputAdornment>
									}
								/>
								{errors.mailToSendCode && (
									<Typography variant="body2">
										{errors.mailToSendCode.message}
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{translate("auth_form_texts", lng, 1)}</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, 1)}
									name="verificationCode"
									type="number"
									required
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
									error={errors?.verificationCode ? true : false}
								/>
								{errors.verificationCode && (
									<Typography variant="body2">
										{errors.verificationCode.message}
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
								onClick={handleSubmit(onSubmit)}
								disabled={!canSubmit}
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
