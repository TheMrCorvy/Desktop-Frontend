import React, { FC, useState } from "react"

import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	TextField,
	Backdrop,
	CircularProgress,
	Button,
	Typography,
	IconButton,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,
	Tooltip,
} from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import AutorenewIcon from "@material-ui/icons/Autorenew"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import StepThree from "../RegisterSteps/StepThree"
import UnlockData from "../../UnlockData"
import StopPremium from "../StopPremium"

import { secretKey4Testing, user4Testing } from "../../../misc/Data4Testing"
import CopyText from "../../CopyText"

type Props = { testing?: boolean }

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
		borderRadius: {
			borderRadius: 8,
		},
		marginTop: {
			marginTop: "3rem",
		},
		smallMarginTop: {
			marginTop: 20,
		},
		textCenter: {
			textAlign: "center",
		},
		exportBtn: {
			backgroundColor: theme.palette.type === "dark" ? "#1fad2c" : "#1ebd2d",
			"&:hover": {
				backgroundColor: theme.palette.type === "dark" ? "#15a122" : "#1cad29",
			},
		},
	})
)

const AccessManagement: FC<Props> = ({ testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [locked, setLocked] = useState(true)

	const [loading, setLoading] = useState(false)

	const [secretKey, setSecretKey] = useState("")

	const classes = useStyles()

	const callApi = async () => {
		// here we'll call the api either to get the decrypted data, or to send the new data
		setLoading(true)

		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}

	const renew2FA = () => {
		setLoading(true)

		callApi().then(() => {
			setSecretKey(secretKey4Testing)
		})
	}

	const toggleLock = () => {
		callApi().then(() => {
			setLocked(!locked)
		})
	}

	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
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
									defaultValue={user4Testing.name}
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
									name="phoneNumber"
									type={locked ? "password" : "text"}
									defaultValue={user4Testing.phone_number}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 2)}
									name="mainEmail"
									type={locked ? "password" : "email"}
									defaultValue={user4Testing.email}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 3)}
									name="recoveryEmail"
									type={locked ? "password" : "email"}
									defaultValue={user4Testing.recovery_email}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 4)}
									name="antiFishing"
									type={locked ? "password" : "text"}
									defaultValue={user4Testing.anti_fishing_secret}
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
										defaultValue={user4Testing.security_access_code}
										disabled
										endAdornment={
											!locked && (
												<InputAdornment position="end">
													<CopyText
														body={user4Testing.security_access_code}
													>
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
														<IconButton>
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
									<Grid item xs={12} className={classes.textCenter}>
										<Button
											variant="contained"
											disableElevation
											color="primary"
											className={classes.exportBtn}
										>
											{translate("export_credentials", lng, 0)}
										</Button>
										<Typography
											variant="body2"
											paragraph
											gutterBottom
											className={classes.smallMarginTop}
										>
											{translate("export_credentials", lng, 1)}
										</Typography>
									</Grid>
									<Grid
										item
										xs={12}
										className={classes.marginTop}
										style={{
											textAlign: "center",
										}}
									>
										{!secretKey ? (
											<>
												<Button
													variant="contained"
													color="secondary"
													size="large"
													disableElevation
													onClick={renew2FA}
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
												alter={{
													email: user4Testing.email,
													secretKey: secretKey4Testing,
												}}
											/>
										)}
									</Grid>
									{user4Testing.role === "premium" && <StopPremium />}
								</>
							)}
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</>
	)
}

export default AccessManagement
