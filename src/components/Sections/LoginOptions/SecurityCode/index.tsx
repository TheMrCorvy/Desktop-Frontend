import React from "react"
import { useForm } from "react-hook-form"

import {
	Box,
	Grid,
	Button,
	OutlinedInput,
	InputLabel,
	FormControl,
	Typography,
} from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { login } from "../../../../redux/actions/authTokenActions"

import { translate } from "../../../../lang"

import { credential4Testing, user4Testing } from "../../../Data4Testing"
import { UserT } from "../../../../redux/types"
import { CredentialT } from "../../../CredentialCard"

import { ApiResponseLogin } from "../TwoFactorCode"

type FormInputs = {
	mainEmail: string
	recoveryEmail: string
	antiFishingSecret: string
	securityCode: string
}

const SecurityCode = ({ isRobot, testing }: { isRobot: boolean; testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const { register, errors, handleSubmit } = useForm()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)
	const emailPattern = {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: translate("form_validation_messages", lng, 3),
	}

	const onSubmit = (data: FormInputs) => {
		let responseData: ApiResponseLogin

		if (testing) {
			console.log(data)

			const fakeResponse: ApiResponseLogin = {
				token: "fake api authorization token",
				user_data: user4Testing,
				user_credentials: credential4Testing,
			}

			responseData = fakeResponse
		} else {
			// here goes the api call, for now i'll just copy-paste the same fake response
			const fakeResponse: ApiResponseLogin = {
				token: "fake api authorization token",
				user_data: user4Testing,
				user_credentials: credential4Testing,
			}

			responseData = fakeResponse
		}

		localStorage.put("user_data", JSON.stringify(responseData.user_data))
		localStorage.put("user_credentials", JSON.stringify(responseData.user_credentials))

		dispatch(login(responseData.token))
	}

	return (
		<Box component="div" data-testid="test_security_code_form">
			<Grid item xs={12}>
				<Grid
					container
					justify="center"
					spacing={3}
					component="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>{translate("auth_form_texts", lng, 2)}</InputLabel>
							<OutlinedInput
								label={translate("auth_form_texts", lng, 2)}
								name="mainEmail"
								required
								type="email"
								inputProps={{
									"data-testid": "test_main_email_input",
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
								<Typography variant="body2">{errors.mainEmail.message}</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>{translate("auth_form_texts", lng, 3)}</InputLabel>
							<OutlinedInput
								label={translate("auth_form_texts", lng, 3)}
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
							/>
							{errors.recoveryEmail && (
								<Typography variant="body2">
									{errors.recoveryEmail.message}
								</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>{translate("auth_form_texts", lng, 4)}</InputLabel>
							<OutlinedInput
								label={translate("auth_form_texts", lng, 4)}
								name="antiFishingSecret"
								required
								type="text"
								inputProps={{
									"data-testid": "test_anti_fishing_input",
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
									}),
								}}
								error={errors?.antiFishingSecret ? true : false}
							/>
							{errors.antiFishingSecret && (
								<Typography variant="body2">
									{errors.antiFishingSecret.message}
								</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>{translate("auth_form_texts", lng, 5)}</InputLabel>
							<OutlinedInput
								label={translate("auth_form_texts", lng, 5)}
								name="securityCode"
								required
								type="string"
								inputProps={{
									ref: register({
										required: {
											value: true,
											message: requiredMessage,
										},
										maxLength: {
											value: 10,
											message: maxCharMessage,
										},
										minLength: {
											value: 10,
											message: minCharMessage,
										},
									}),
								}}
								error={errors?.securityCode ? true : false}
							/>
							{errors.securityCode && (
								<Typography variant="body2">
									{errors.securityCode.message}
								</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							disableElevation
							disabled={isRobot}
							onClick={handleSubmit(onSubmit)}
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
