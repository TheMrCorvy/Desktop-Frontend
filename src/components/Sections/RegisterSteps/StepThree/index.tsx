import { FC, useEffect, useState } from "react"

import {
	Grid,
	FormControl,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	Button,
	Typography,
	CircularProgress,
	CardActionArea,
} from "@material-ui/core"

import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { toggleLoading, setErrorLoading } from "../../../../redux/actions/loadingActions"
import { translate } from "../../../../lang"

import { useForm } from "react-hook-form"

import { QRCode } from "react-qrcode-logo"
import CopyText from "../../../CopyText"
import { CredentialT, UserT } from "../../../../misc/types"

type AuthResponse = {
	user_data: UserT
	user_credentials: CredentialT[]
	token: string
}

type Props = {
	isRobot: boolean
	onAuthSuccess: (apiResponse: AuthResponse) => void
	token: string
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

const StepThree: FC<Props> = ({ isRobot, onAuthSuccess, token, testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const dispatch = useDispatch()

	const [userData, setUserData] = useState<UserData>({
		email: "",
		secretKey: "",
	})

	const { REACT_APP_BASE_URI } = process.env

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

		if (REACT_APP_BASE_URI && token) {
			//the component starts loading by default, so there's no need to dispatch a loading to redux
			fetch(REACT_APP_BASE_URI + "/auth/refresh-2fa-secret", {
				headers: {
					Accept: "application/json",
					"Accept-Language": lng,
					"Content-type": "application/json",
					Authorization: "Bearer " + token,
				},
			})
				.then((res) => res.json())
				.then((response) => {
					console.log(response)

					if (response.status === 200) {
						setUserData({
							email: response.data.email,
							secretKey: response.data.secret,
						})

						console.log(response)
					} else {
						handleError(response)
					}
				})
		}
	}, [])

	const onSubmit = (data: FormInput) => {
		if (testing) return

		dispatch(toggleLoading(true))

		if (REACT_APP_BASE_URI && token) {
			fetch(REACT_APP_BASE_URI + "/auth/register/step-3", {
				headers: {
					Accept: "application/json",
					"Accept-Language": lng,
					"Content-type": "application/json",
					Authorization: "Bearer " + token,
				},
				method: "POST",
				body: JSON.stringify({
					twoFactorCode: data.verificationCode,
				}),
			})
				.then((res) => res.json())
				.then((response) => {
					if (response.status === 200) {
						dispatch(toggleLoading(false))
						console.log(response.data)
						onAuthSuccess(response.data)
					} else {
						handleError(response)
					}
				})
		}
	}

	const handleError = (error: any) => {
		console.log(error)

		if (error.message) {
			dispatch(setErrorLoading(error.message))
		} else {
			dispatch(setErrorLoading("Error..."))
		}
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
						<CardActionArea className={classes.cardActionArea}>
							<CopyText body={userData.secretKey}>
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
									<br />
									{translate("click_to_copy", lng)}
								</Typography>
							</CopyText>
						</CardActionArea>
					</Grid>
				</>
			)}
		</Grid>
	)
}

export default StepThree
