import React, { useState, useEffect, ChangeEvent } from "react"

import { useForm } from "react-hook-form"

import {
	Box,
	Grid,
	FormControl,
	InputLabel,
	OutlinedInput,
	Button,
	Typography,
} from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { login } from "../../../../redux/actions/authTokenActions"

import { translate } from "../../../../lang"

import { credential4Testing, user4Testing } from "../../../../misc/Data4Testing"
import { ApiResponseLoginT } from "../../../../misc/ajaxManager"

import { initiateDB } from "../../../../misc/indexedDB"

import Snackbar from "../../../Snackbar"

type FormInputs = {
	email: String
	verificationCode: string | number
}

const TwoFactorCode = ({ isRobot, testing }: { isRobot: boolean; testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [formData, setFormData] = useState<FormInputs>({
		email: "",
		verificationCode: "",
	})

	const [error, setError] = useState(false)

	const { register, errors, handleSubmit } = useForm()

	const dispatch = useDispatch()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

	useEffect(() => {
		if (testing) {
			setFormData({
				email: user4Testing.email,
				verificationCode: 123456,
			})
		}
	}, [])

	const onSubmit = (data: FormInputs) => {
		let responseData: ApiResponseLoginT

		if (testing) {
			console.log(data)

			const fakeResponse: ApiResponseLoginT = {
				token: "fake api authorization token",
				user_data: user4Testing,
				user_credentials: credential4Testing,
			}

			responseData = fakeResponse
		} else {
			// here goes the api call, for now i'll just copy-paste the same fake response
			const fakeResponse: ApiResponseLoginT = {
				token: "fake api authorization token",
				user_data: user4Testing,
				user_credentials: credential4Testing,
			}

			responseData = fakeResponse
		}

		initiateDB(responseData.user_data, responseData.user_credentials).then((storedData) => {
			if (storedData.failed) {
				console.log(storedData)

				setError(true)
			} else {
				dispatch(login(responseData.token))
			}
		})
	}

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
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
									value={formData?.email}
									onChange={onChange}
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
									value={formData?.verificationCode}
									onChange={onChange}
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
			{error && (
				<Snackbar
					message={translate("error_messages", lng, 3)}
					open={error}
					duration={25000}
				/>
			)}
		</Box>
	)
}

export default TwoFactorCode
