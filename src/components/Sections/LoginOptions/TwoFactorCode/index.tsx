import React from "react"
import {
	Box,
	Grid,
	FormControl,
	InputLabel,
	OutlinedInput,
	Button,
	Typography,
} from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

type FormInputs = {
	email: String
	verificationCode: number
}

const TwoFactorCode = ({ isRobot, testing }: { isRobot: boolean; testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { register, errors, handleSubmit } = useForm()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

	const onSubmit = (data: FormInputs) => {
		if (testing) return

		console.log("production api call")
		console.log(data)
	}

	return (
		<Box component="div" data-testid="test_2fa_form">
			<Grid container justify="center" spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid container spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{translate("auth_form_texts", lng, 0)}</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, 0)}
									name="email"
									required
									type="email"
									inputProps={{
										"data-testid": "test_email_input",
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
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: translate(
													"form_validation_messages",
													lng,
													3
												),
											},
										}),
									}}
									error={errors?.email ? true : false}
								/>
								{errors.email && (
									<Typography variant="body2">{errors.email.message}</Typography>
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
										"data-testid": "test_2fa_code_input",
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
								disabled={isRobot}
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
