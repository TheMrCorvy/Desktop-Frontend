import { FC } from "react"
import { Grid, FormControl, InputLabel, OutlinedInput, Button, Typography } from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { toggleLoading, setErrorLoading } from "../../../../redux/actions/loadingActions"
import { translate } from "../../../../lang"

import { useApi } from "../../../../hooks/useApi"

import { useForm } from "react-hook-form"

const StepTwo: FC<Props> = ({ nextStep, isRobot, testing, email }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const { register, errors, handleSubmit } = useForm()

	const callApi = useApi

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

	const onSubmit = (data: FormInputs) => {
		if (testing) return

		dispatch(toggleLoading(true))

		callApi({
			lng,
			endpoint: "/auth/register/step-2",
			method: "POST",
			body: {
				mainEmailCode: data.mainEmailCode,
				recoveryEmailCode: data.recoveryEmailCode,
				mainEmail: email,
			},
		}).then((response) => {
			if (response.status === 200) {
				dispatch(toggleLoading(false))

				nextStep(response.data.token)
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
		<form onSubmit={handleSubmit(onSubmit)} data-testid="test_step_two">
			<Grid container justify="center">
				<Grid item xs={12} sm={6}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{translate("auth_form_texts", lng, 9)}</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, 9)}
									name="mainEmailCode"
									type="number"
									required
									inputProps={{
										"data-testid": "test_main_email_code",
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
									error={errors?.mainEmailCode ? true : false}
								/>
								{errors.mainEmailCode && (
									<Typography variant="body2">
										{errors.mainEmailCode.message}
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{translate("auth_form_texts", lng, 10)}</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, 10)}
									name="recoveryEmailCode"
									type="number"
									required
									inputProps={{
										"data-testid": "test_recovery_email_code",
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
									error={errors?.recoveryEmailCode ? true : false}
								/>
								{errors.recoveryEmailCode && (
									<Typography variant="body2">
										{errors.recoveryEmailCode.message}
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
								{translate("continue", lng)}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</form>
	)
}

type Props = {
	nextStep: (token: string) => void
	isRobot: boolean
	testing?: boolean
	email?: string
}

type FormInputs = {
	mainEmailCode: number | string
	recoveryEmailCode: number | string
}

export default StepTwo
