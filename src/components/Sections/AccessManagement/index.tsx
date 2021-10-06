import { FC, useState, useEffect, ChangeEvent } from "react"

/******************************************************************************** MUI */
import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	TextField,
	Button,
	Typography,
	IconButton,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,
	Tooltip,
} from "@material-ui/core"

import useStyles from "./styles"

import FileCopyIcon from "@material-ui/icons/FileCopy"
import AutorenewIcon from "@material-ui/icons/Autorenew"

/******************************************************************************** redux */
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { showError } from "../../../redux/actions/errorHandlingActions"
import { login } from "../../../redux/actions/authTokenActions"
import { toggleLoading, setErrorLoading } from "../../../redux/actions/loadingActions"
import { translate } from "../../../lang"

/******************************************************************************** types */
import { ApiCallI, ApiResponseLoginT } from "../../../misc/types"

/******************************************************************************** indexedDB */
import { getUser } from "../../../misc/indexedDB"

/******************************************************************************** components */
import StepThree from "../RegisterSteps/StepThree"
import UnlockData from "../../UnlockData"
import StopPremium from "../StopPremium"
import CopyText from "../../CopyText"

/******************************************************************************** api */
import { callApi } from "../../../misc/ajaxManager"
import { getUserAgent } from "../../../misc/staticData"

type Props = { testing?: boolean }

type Form = {
	name: string
	phone_number: string
	email: string
	recovery_email: string
	anti_fishing_secret: string
	security_access_code: string
}

const placeholder: Form = {
	name: "•••••",
	email: "•••••",
	recovery_email: "•••••",
	phone_number: "•••••",
	anti_fishing_secret: "•••••",
	security_access_code: "•••••",
}

const AccessManagement: FC<Props> = ({ testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { token } = useSelector((state: RootState) => state.token)

	const dispatch = useDispatch()

	const classes = useStyles()

	const [locked, setLocked] = useState(true)

	const [refreshSecret, setRefreshSecret] = useState(false)

	const [form, setForm] = useState<Form>(placeholder)

	const [userRole, setUserRole] = useState("")

	useEffect(() => {
		obtainUser()
	}, [])

	const obtainUser = async () => {
		let user = await getUser()

		if (user === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		setUserRole(user.role)
	}

	const handleChange = (event: ChangeEvent<{ value: string }>) => {
		const target = event.target as HTMLInputElement

		setForm({
			...form,
			[target.name]: target.value,
		})
	}

	const toggleLock = () => {
		if (!token) return

		if (locked) {
			dispatch(toggleLoading(true))

			const request: ApiCallI = {
				lng,
				token,
				method: "POST",
				endpoint: "/auth/grant-access",
				body: {
					accessTo: "user-data",
					accessingPlatform: "web",
					accessingDevice: getUserAgent(),
				},
			}

			callApi(request).then((response) => {
				if (response.status === 200) {
					setForm(response.data)

					dispatch(toggleLoading(false))

					setLocked(false)
				} else {
					dispatch(setErrorLoading(response.message))
				}
			})
		} else {
			dispatch(toggleLoading(true))

			const request: ApiCallI = {
				lng,
				token,
				method: "PUT",
				endpoint: "/user/update",
				body: form,
			}

			callApi(request).then((response) => {
				if (response.status === 200) {
					dispatch(toggleLoading(false))

					setForm(placeholder)

					setLocked(true)
				} else {
					console.error(response)

					dispatch(setErrorLoading(response.message))
				}
			})
		}
	}

	const secretWasAccepted = (data: ApiResponseLoginT) => {
		setRefreshSecret(false)

		dispatch(login(data.token))
	}

	const generateNewCode = () => {
		if (!token) return

		dispatch(toggleLoading(true))

		const request: ApiCallI = {
			lng,
			token,
			method: "GET",
			endpoint: "/auth/renew-security-code",
		}

		callApi(request).then((response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))

				return
			}

			setForm({ ...form, security_access_code: response.data.renewed_code })

			dispatch(toggleLoading(false))
		})
	}

	return (
		<Grid item xs={12} md={8} data-testid="test_access_management">
			<Card className={classes.borderRadius} elevation={2}>
				<CardHeader
					title={translate("access_management", lng, 0)}
					action={
						<UnlockData
							toggleLock={toggleLock}
							locked={locked}
							testing={testing}
							lockedTitle={translate("access_management", lng, 1)}
							unlockedTitle={translate("access_management", lng, 2)}
						/>
					}
				/>
				<CardContent>
					<Grid container justify="space-between" spacing={4}>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label={translate("auth_form_texts", lng, 6)}
								name="name"
								type={locked ? "password" : "text"}
								value={form.name}
								onChange={handleChange}
								disabled={locked}
								fullWidth
								inputProps={{
									"data-testid": "test_name_input",
								}}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label={translate("auth_form_texts", lng, 7)}
								name="phone_number"
								type={locked ? "password" : "text"}
								value={form.phone_number}
								onChange={handleChange}
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label={translate("auth_form_texts", lng, 2)}
								name="email"
								type={locked ? "password" : "email"}
								value={form.email}
								onChange={handleChange}
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label={translate("auth_form_texts", lng, 3)}
								name="recovery_email"
								type={locked ? "password" : "email"}
								value={form.recovery_email}
								onChange={handleChange}
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label={translate("auth_form_texts", lng, 4)}
								name="anti_fishing_secret"
								type={locked ? "password" : "text"}
								value={form.anti_fishing_secret}
								onChange={handleChange}
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth variant="outlined">
								<InputLabel htmlFor="standard-adornment-password">
									{translate("login_options", lng, 3)}
								</InputLabel>
								<OutlinedInput
									type={locked ? "password" : "text"}
									label={translate("login_options", lng, 3)}
									value={form.security_access_code}
									onChange={handleChange}
									disabled
									name="security_access_code"
									endAdornment={
										!locked && (
											<InputAdornment position="end">
												<CopyText body={form.security_access_code}>
													<Tooltip
														placement="bottom"
														title={translate("actions", lng, 0)}
													>
														<IconButton>
															<FileCopyIcon />
														</IconButton>
													</Tooltip>
												</CopyText>
											</InputAdornment>
										)
									}
									startAdornment={
										!locked && (
											<InputAdornment position="end">
												<Tooltip
													placement="bottom"
													title={translate("actions", lng, 2)}
												>
													<IconButton onClick={generateNewCode}>
														<AutorenewIcon />
													</IconButton>
												</Tooltip>
											</InputAdornment>
										)
									}
								/>
							</FormControl>
						</Grid>

						{!locked && (
							<>
								<Grid
									item
									xs={12}
									className={classes.marginTop}
									style={{
										textAlign: "center",
									}}
								>
									{!refreshSecret ? (
										<>
											<Button
												variant="contained"
												color="secondary"
												size="large"
												disableElevation
												onClick={() => setRefreshSecret(true)}
											>
												{translate("renew_secret_2fa", lng)}
											</Button>
											<Typography
												variant="body1"
												className={classes.marginTop}
											>
												{translate("renew_secret_2fa", lng, 1)}
											</Typography>
										</>
									) : (
										<StepThree
											isRobot={false}
											onAuthSuccess={secretWasAccepted}
											token={token ? token : ""}
										/>
									)}
								</Grid>

								{userRole === "premium" && <StopPremium />}
							</>
						)}
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default AccessManagement
