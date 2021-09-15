import { FC, ChangeEvent, useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import {
	Grid,
	FormControl,
	InputLabel,
	OutlinedInput,
	Button,
	Typography,
	InputAdornment,
} from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

import { translate } from "../../../../lang"

import TimerButton from "../../../TimerButton"
import Snackbar from "../../../Snackbar"

import { credential4Testing, user4Testing } from "../../../../misc/Data4Testing"

import { ApiCallI, ApiResponseLoginT } from "../../../../misc/types"
import { callApi } from "../../../../misc/ajaxManager"

type Props = {
	onAuthSuccess: (res: ApiResponseLoginT) => void
	endpoint: string
	isRecovery: boolean
	isRobot: boolean
	testing?: boolean
}

type FormInputs = {
	mailToSendCode: String
	verificationCode: number
	mainEmail?: string
}

const EmailCode: FC<Props> = ({ onAuthSuccess, endpoint, isRobot, isRecovery, testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { register, errors, handleSubmit } = useForm()

	const [formData, setFormData] = useState({
		mainEmail: "",
		mailToSendCode: "",
	})

	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
	})

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)
	const emailPattern = {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: translate("form_validation_messages", lng, 3),
	}

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
			// here goes the api call, for now i'll just leave a fake response
			let fakeResponse: ApiResponseLoginT

			if (endpoint !== "/login") {
				fakeResponse = {
					token: "fake api authorization token",
					user_data: user4Testing,
					user_credentials: credential4Testing,
					isAuthorized: true,
				}
			} else {
				fakeResponse = {
					token: "fake api authorization token",
					user_data: user4Testing,
					user_credentials: credential4Testing,
				}
			}

			responseData = fakeResponse
		}

		onAuthSuccess(responseData)
	}

	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		const target = event.target as HTMLInputElement

		setFormData({
			...formData,
			[target.name]: target.value,
		})
	}

	const sendCodeByEmail = () => {
		const { REACT_APP_ENV_LOCAL_API } = process.env

		if (emailPattern.value.test(formData.mailToSendCode)) {
			const request: ApiCallI = {
				preferredLang: lng,
				endpoint: "/send-code-by-email",
				method: "POST",
				envIs: REACT_APP_ENV_LOCAL_API ? "local" : "production",
				body: {
					email: formData.mailToSendCode,
					isSecondary: isRecovery,
				},
			}

			callApi(request).then((res) => {
				setSnackbar({
					open: true,
					message: res.message,
				})

				console.log(res)
			})
		}
	}

	useEffect(() => {
		if (snackbar.open) {
			const snackTime = setTimeout(() => {
				setSnackbar({ ...snackbar, open: false })
			}, 30000)

			return () => clearTimeout(snackTime)
		}
	}, [snackbar])

	return (
		<>
			{snackbar.open && (
				<Snackbar open={snackbar.open} message={snackbar.message} duration={30000} />
			)}
			<Grid
				container
				justify="center"
				spacing={3}
				data-testid={!isRecovery ? "test_main_email_form" : "test_recovery_email_form"}
				style={{ flexGrow: 1 }}
			>
				<Grid item xs={12} sm={10} md={8}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={3}>
							{isRecovery && (
								<Grid item xs={12}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel>
											{translate("auth_form_texts", lng, 2)}
										</InputLabel>
										<OutlinedInput
											label={translate("auth_form_texts", lng, 2)}
											name="mainEmail"
											required
											type="email"
											value={formData.mainEmail}
											onChange={handleChange}
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
										label={translate(
											"auth_form_texts",
											lng,
											isRecovery ? 3 : 0
										)}
										name="mailToSendCode"
										required
										type="email"
										value={formData.mailToSendCode}
										onChange={handleChange}
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
											<InputAdornment
												position="end"
												onClick={() => sendCodeByEmail()}
											>
												{!isRobot ? (
													<TimerButton
														title={translate("send_email", lng)}
														initialTime={50}
													/>
												) : (
													<Button
														size="small"
														disabled
														variant="contained"
													>
														{translate("send_email", lng)}
													</Button>
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
									disabled={isRobot}
									type="submit"
								>
									{translate("navbar_login_btn", lng)}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</>
	)
}

export default EmailCode
