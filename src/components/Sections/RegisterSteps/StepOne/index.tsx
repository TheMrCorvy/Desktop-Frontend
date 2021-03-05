import React from "react"

import {
	Grid,
	FormControl,
	InputLabel,
	OutlinedInput,
	Button,
	Typography,
	InputAdornment,
} from "@material-ui/core"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { useForm } from "react-hook-form"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

import DialogComponent from "../../../Dialog"

type Props = {
	nextStep: () => void
	isRobot: boolean
	testing?: boolean
}

type FormInputs = {
	name: string
	phoneNumber: string
	mainEmail: string
	recoveryEmail: string
	antiFishingSecret: string
	antiFishingSecret_confirmation: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		antiFishingDialog: {
			boxShadow: "none",
			background: theme.palette.primary.main,
			"&:hover": {
				background: theme.palette.primary.main,
			},
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
	})
)

const StepOne = ({ nextStep, isRobot, testing }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { register, errors, handleSubmit, getValues } = useForm()

	const classes = useStyles()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)
	const emailPattern = {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: translate("form_validation_messages", lng, 3),
	}

	const onSubmit = (data: FormInputs) => {
		if (testing) return

		console.log("production api call")
		console.log(data)

		nextStep()
	}

	const validateInputs = (input: string, value: FormInputs) => {
		let validation

		if (input === "secret") {
			validation =
				value === getValues().antiFishingSecret ||
				translate("form_validation_messages", lng, 4)
		} else if (input === "recovery email") {
			validation =
				value !== getValues().mainEmail || translate("form_validation_messages", lng, 5)
		}

		return validation
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} data-testid="test_register_step_1">
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
							name="antiFishingSecret"
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
							error={errors?.antiFishingSecret ? true : false}
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
						{errors.antiFishingSecret && (
							<Typography variant="body2">
								{errors.antiFishingSecret.message}
							</Typography>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 8)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 8)}
							name="antiFishingSecret_confirmation"
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
							error={errors?.antiFishingSecret_confirmation ? true : false}
						/>
						{errors.antiFishingSecret_confirmation && (
							<Typography variant="body2">
								{errors.antiFishingSecret_confirmation.message}
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

export default StepOne
