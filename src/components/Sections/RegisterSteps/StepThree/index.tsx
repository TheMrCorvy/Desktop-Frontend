import React from "react"

import {
	Grid,
	FormControl,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	Button,
	Typography,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

import { QRCode } from "react-qrcode-logo"

const useStyles = makeStyles({
	centerAll: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	secretKey: {
		color: "#ff6200",
	},
})

type FormInput = {
	verificationCode: string
}

const StepThree = ({ isRobot, testing }: { isRobot: boolean; testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { register, errors, handleSubmit } = useForm()

	const classes = useStyles()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

	const appName = "PasuSewa 4"
	const email = "mr.corvy@gmail.com"
	const secretKey = "DCRMALCXPEZOFKZH"

	const onSubmit = (data: FormInput) => {
		if (testing) return

		console.log("production api call")
		console.log(data)
	}

	return (
		<Grid container spacing={3} justify="space-around">
			<Grid item xs={12} sm={6}>
				<Typography paragraph variant="subtitle2">
					{translate("register_dialog_texts", lng, 4)}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{translate("auth_form_texts", lng, 1)}</InputLabel>
						<OutlinedInput
							label={translate("auth_form_texts", lng, 1)}
							name="verificationCode"
							required
							type="email"
							inputProps={{
								"data-testid": "test_verification_code_input",
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
							endAdornment={
								<InputAdornment position="end">
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
								</InputAdornment>
							}
						/>
						{errors.verificationCode && (
							<Typography variant="body2">
								{errors.verificationCode.message}
							</Typography>
						)}
					</FormControl>
				</form>
			</Grid>
			<Grid item xs={12} sm={6}>
				<QRCode
					value={`otpauth://totp/${appName}:${email}?secret=${secretKey}&issuer=${appName}&algorithm=SHA1&digits=6&period=30`}
					size={200}
				/>
			</Grid>
			<Grid item xs={12} sm={6} className={classes.centerAll}>
				<Typography paragraph gutterBottom variant="subtitle1">
					{translate("copy_paste_secret_key", lng)}
					<br />
					<Typography
						paragraph
						gutterBottom
						variant="h6"
						component="h6"
						className={classes.secretKey}
					>
						{secretKey}
					</Typography>
				</Typography>
			</Grid>
		</Grid>
	)
}

export default StepThree
