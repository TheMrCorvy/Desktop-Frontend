import React, { useEffect, useState } from "react"

import {
	Grid,
	FormControl,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	Button,
	Typography,
	CircularProgress,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

import { QRCode } from "react-qrcode-logo"

type Props = {
	isRobot: boolean
	testing?: boolean
}

type FormInput = {
	verificationCode: string
}

type UserData = {
	email: string
	secretKey: string
	error?: any
}

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
	qrContainer: {
		display: "flex",
		justifyContent: "center",
	},
})

const StepThree = ({ isRobot, testing }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [userData, setUserData] = useState<UserData>({
		email: "",
		secretKey: "",
	})

	const { register, errors, handleSubmit } = useForm()

	const classes = useStyles()

	const requiredMessage = translate("form_validation_messages", lng, 0)
	const maxCharMessage = translate("form_validation_messages", lng, 1)
	const minCharMessage = translate("form_validation_messages", lng, 2)

	useEffect(() => {
		if (testing) {
			setUserData({
				email: "mr.corvy@gmail.com",
				secretKey: "DCRMALCXPEZOFKZH",
			})

			return
		}

		//api call, just for now I'll simulate the api call
		const timer = setTimeout(() => {
			setUserData({
				email: "mr.corvy@gmail.com",
				secretKey: "DCRMALCXPEZOFKZH",
			})
		}, 5000)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	const onSubmit = (data: FormInput) => {
		if (testing) return

		console.log("production api call")
		console.log(data)
	}

	return (
		<Grid container spacing={3} justify="space-around" data-testid="test_step_three">
			{!userData.email || !userData.secretKey ? (
				<>
					<Grid item xs={12} className={classes.centerAll}>
						<CircularProgress />
					</Grid>
					<Grid item xs={12} className={classes.centerAll}>
						<Typography paragraph variant="subtitle2">
							{translate("loading", lng)}
						</Typography>
					</Grid>
				</>
			) : (
				<>
					<Grid item xs={12} sm={6}>
						<Typography paragraph variant="subtitle2">
							{translate("register_dialog_texts", lng, 4)}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{translate("auth_form_texts", lng, 8)}</InputLabel>
								<OutlinedInput
									label={translate("auth_form_texts", lng, 8)}
									name="verificationCode"
									required
									type="number"
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
					<Grid item xs={12} sm={6} className={classes.qrContainer}>
						{!testing && (
							<QRCode
								value={`otpauth://totp/${translate("app_name", lng)}:${
									userData.email
								}?secret=${userData.secretKey}&issuer=${translate(
									"app_name",
									lng
								)}&algorithm=SHA1&digits=6&period=30`}
								size={200}
							/>
						)}
					</Grid>
					<Grid item xs={12} sm={6} className={classes.centerAll}>
						<Typography paragraph gutterBottom variant="subtitle1">
							{translate("copy_paste_secret_key", lng)}
							<br />
							<Typography
								paragraph
								gutterBottom
								variant="h6"
								component="span"
								className={classes.secretKey}
							>
								{userData.secretKey}
							</Typography>
						</Typography>
					</Grid>
				</>
			)}
		</Grid>
	)
}

export default StepThree
