import { FC } from "react"
import { useForm } from "react-hook-form"

import { Grid, Button, OutlinedInput, InputLabel, FormControl, Typography } from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { toggleLoading, setErrorLoading } from "../../../../redux/actions/loadingActions"
import { translate } from "../../../../lang"

import { useApi } from "../../../../hooks/useApi"

import { credential4Testing, user4Testing } from "../../../../misc/Data4Testing"

import { ApiResponseLoginT, UserT } from "../../../../misc/types"

const SecurityCode: FC<Props> = ({ onAuthSuccess, isRobot, testing, user }) => {
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

	const callApi = useApi

	const onSubmit = (data: FormInputs) => {
		if (testing) {
			console.log(data)
			const fakeResponse: ApiResponseLoginT = {
				token: "fake api authorization token",
				user_data: user4Testing,
				user_credentials: credential4Testing,
			}
			onAuthSuccess(fakeResponse)
			return
		}

		dispatch(toggleLoading(true))

		callApi({
			lng,
			endpoint: "/auth/login/security-code",
			method: "POST",
			body: data,
		}).then((response) => {
			if (response.status === 200) {
				dispatch(toggleLoading(false))

				onAuthSuccess(response.data)
			} else {
				console.error(response)

				if (response.message) {
					dispatch(setErrorLoading(response.message))
				} else {
					dispatch(setErrorLoading("Error..."))
				}
			}
		})
	}

	return (
		<Grid item xs={12} data-testid="test_security_code_form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container justify="center" spacing={3}>
					<Grid item xs={12} sm={6}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>{translate("auth_form_texts", lng, 2)}</InputLabel>
							<OutlinedInput
								label={translate("auth_form_texts", lng, 2)}
								name="mainEmail"
								required
								type="email"
								defaultValue={user ? user.email : ""}
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
								defaultValue={user ? user.recovery_email : ""}
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
								type="password"
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
								type="password"
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
							type="submit"
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
			</form>
		</Grid>
	)
}

type Props = {
	onAuthSuccess: (res: ApiResponseLoginT) => void
	endpoint: string
	isRobot: boolean
	testing?: boolean
	user?: UserT
}

type FormInputs = {
	mainEmail: string
	recoveryEmail: string
	antiFishingSecret: string
	securityCode: string
}

export default SecurityCode
