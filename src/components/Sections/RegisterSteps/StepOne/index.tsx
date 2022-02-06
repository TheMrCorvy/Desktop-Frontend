import { FC } from "react"

import {
	Grid,
	FormControl,
	InputLabel,
	OutlinedInput,
	Button,
	Typography,
	InputAdornment,
} from "@material-ui/core"

import useStyles from "./styles"

import { useForm } from "react-hook-form"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { toggleLoading, setErrorLoading } from "../../../../redux/actions/loadingActions"
import { translate } from "../../../../lang"

import { useApi } from "../../../../hooks/useApi"

import DialogComponent from "../../../Dialog"

const StepOne: FC<Props> = ({ nextStep, isRobot, testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const callApi = useApi

	const { register, errors, handleSubmit, getValues } = useForm()

	const classes = useStyles()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)
	const emailPattern = {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: translate("form_validation_messages", lng, 3),
	}

	const invitationCodeLabel =
		translate("invitation_code", lng) + " " + translate("auth_form_texts", lng, 15)

	const onSubmit = (data: FormInputs) => {
		if (testing) return

		dispatch(toggleLoading(true))

		callApi({
			lng,
			endpoint: "/auth/register/step-1",
			method: "POST",
			body: data,
		}).then((response) => {
			if (response.status === 200) {
				dispatch(toggleLoading(false))

				nextStep(response.data.registered_email)
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

	const validateInputs = (input: string, value: FormInputs) => {
		let validation

		if (input === "secret") {
			validation =
				value === getValues().secretAntiFishing ||
				translate("form_validation_messages", lng, 4)
		} else if (input === "recovery email") {
			validation =
				value !== getValues().mainEmail || translate("form_validation_messages", lng, 5)
		}

		return validation
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} data-testid="test_step_one">
			<Grid container spacing={3} justify="space-around">
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 6)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 6)}
							name="name"
							required
							type="text"
							inputProps={{
								"data-testid": "test_name_input",
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
							error={errors?.name ? true : false}
						/>
						{errors.name && (
							<Typography variant="body2">{errors.name.message}</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 7)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 7)}
							name="phoneNumber"
							required
							type="text"
							inputProps={{
								"data-testid": "test_phone_num_input",
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
							error={errors?.phoneNumber ? true : false}
						/>
						{errors.phoneNumber && (
							<Typography variant="body2">{errors.phoneNumber.message}</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 2)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 2)}
							name="mainEmail"
							required
							type="text"
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
							type="text"
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
									validate: (value) => validateInputs("recovery email", value),
								}),
							}}
							error={errors?.recoveryEmail ? true : false}
						/>
						{errors.recoveryEmail && (
							<Typography variant="body2">{errors.recoveryEmail.message}</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 4)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 4)}
							name="secretAntiFishing"
							required
							type="password"
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
								}),
							}}
							error={errors?.secretAntiFishing ? true : false}
							endAdornment={
								<InputAdornment position="end">
									<DialogComponent
										title={translate("anti_fishing_texts", lng, 0)}
										tooltipPlacement="top"
										className={classes.antiFishingDialog}
									>
										<>
											<Typography paragraph variant="body2" gutterBottom>
												{translate("anti_fishing_texts", lng, 1)}
											</Typography>
											<Typography paragraph variant="body2" gutterBottom>
												{translate("anti_fishing_texts", lng, 2)}
											</Typography>
											<Typography paragraph variant="body2" gutterBottom>
												{translate("anti_fishing_texts", lng, 3)}
											</Typography>
											<Typography paragraph variant="body2" gutterBottom>
												{translate("anti_fishing_texts", lng, 4)}
											</Typography>
										</>
									</DialogComponent>
								</InputAdornment>
							}
						/>
						{errors.secretAntiFishing && (
							<Typography variant="body2">
								{errors.secretAntiFishing.message}
							</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 8)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 8)}
							name="secretAntiFishing_confirmation"
							required
							type="password"
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
									validate: (value) => validateInputs("secret", value),
								}),
							}}
							error={errors?.secretAntiFishing_confirmation ? true : false}
						/>
						{errors.secretAntiFishing_confirmation && (
							<Typography variant="body2">
								{errors.secretAntiFishing_confirmation.message}
							</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel color="secondary">{invitationCodeLabel}</InputLabel>
						<OutlinedInput
							label={invitationCodeLabel}
							name="invitationCode"
							required
							type="text"
							inputProps={{
								ref: register({
									required: {
										value: false,
										message: "",
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
							error={errors?.invitationCode ? true : false}
							color="secondary"
						/>
						{errors.invitationCode && (
							<Typography variant="body2">{errors.invitationCode.message}</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						disableElevation
						onClick={handleSubmit(onSubmit)}
						disabled={isRobot}
					>
						{translate("navbar_register_btn", lng)}
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

type Props = {
	nextStep: (email: string) => void
	isRobot: boolean
	testing?: boolean
}

type FormInputs = {
	name: string
	phoneNumber: string
	mainEmail: string
	recoveryEmail: string
	secretAntiFishing: string
	secretAntiFishing_confirmation: string
}

export default StepOne
