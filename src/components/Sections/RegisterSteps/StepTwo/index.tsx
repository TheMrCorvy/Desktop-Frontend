import React from "react"
import { Grid, FormControl, InputLabel, OutlinedInput, Button, Typography } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

type Props = {
	nextStep: () => void
	isRobot: boolean
	testing?: boolean
}

type FormInputs = {
	mainEmailCode: number | string
	recoveryEmailCode: number | string
}

const StepTwo = ({ nextStep, isRobot, testing }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { register, errors, handleSubmit } = useForm()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

	const onSubmit = (data: FormInputs) => {
		if (testing) return

		console.log("production api call")
		console.log(data)

		nextStep()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
								{translate("navbar_login_btn", lng)}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</form>
	)
}

export default StepTwo
