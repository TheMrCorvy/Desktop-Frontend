import { FC, ChangeEvent } from "react"

import { useForm } from "react-hook-form"

import { Grid, FormControl, InputLabel, OutlinedInput, Button, Typography } from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { toggleLoading, setErrorLoading } from "../../../../redux/actions/loadingActions"
import { translate } from "../../../../lang"

import { useApi } from "../../../../hooks/useApi"
import useFormData from "./useFormData"

import { credential4Testing, user4Testing } from "../../../../misc/Data4Testing"
import { ApiResponseLoginT, UserT } from "../../../../misc/types"

const TwoFactorCode: FC<Props> = ({ onAuthSuccess, isRobot, testing, user }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()
	const callApi = useApi
	const { register, errors, handleSubmit } = useForm()
	const { formData, setFormData } = useFormData({ user, testing })

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

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
			endpoint: "/auth/login/two-factor-code",
			method: "POST",
			body: data,
		}).then((response) => {
			if (response.status !== 200) {
				console.error(response)

				if (response.message) {
					dispatch(setErrorLoading(response.message))
				} else {
					dispatch(setErrorLoading("Error..."))
				}
				return
			}

			dispatch(toggleLoading(false))

			onAuthSuccess(response.data)
		})
	}

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<Grid container justify="center" spacing={3} data-testid="test_2fa_form">
			<Grid item xs={12} sm={10} md={8}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
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
									name="twoFactorCode"
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
									error={errors?.twoFactorCode ? true : false}
									value={formData?.twoFactorCode}
									onChange={onChange}
								/>
								{errors.twoFactorCode && (
									<Typography variant="body2">
										{errors.twoFactorCode.message}
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
	email: String
	twoFactorCode: string | number
}

export default TwoFactorCode
