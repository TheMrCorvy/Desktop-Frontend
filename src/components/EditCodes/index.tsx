import React, { FC, ChangeEvent, useState, useEffect } from "react"

import {
	Button,
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useMediaQuery,
	OutlinedInput,
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	Tooltip,
} from "@material-ui/core"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { editCredential } from "../../redux/actions/credentialActions"

import { translate } from "../../lang"

import { AccessCredentialPropT, CredentialPropValueT, ReduxCredentialT } from "../../misc/types"

type Props = {
	codes: string[]
	option: 1 | 2
	isCrypto: boolean
}

type Baggage = {
	oldCredential: ReduxCredentialT
	prop: AccessCredentialPropT
	newValue: CredentialPropValueT
}

const useStyles = makeStyles({
	textCenter: {
		textAlign: "center",
	},
})

const EditCodes: FC<Props> = ({ codes, option, isCrypto }) => {
	const theme = useTheme()

	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const classes = useStyles()

	const { lng } = useSelector((state: RootState) => state.lng)
	const { credential } = useSelector((state: RootState) => state.credential)

	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)

	const [editingCodes, setEditingCodes] = useState<string[]>(codes)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const removeCode = (code: string) => {
		const editedArray: string[] = []

		editingCodes.forEach((codeValue) => {
			if (codeValue !== code) {
				editedArray.push(codeValue)
			}
		})

		setEditingCodes(editedArray)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newArray = [...editingCodes]

		const index = Number(e.target.id.substring(5))

		newArray[index] = e.target.value

		setEditingCodes(newArray)
	}

	useEffect(() => {
		let baggage: Baggage = {
			oldCredential: credential,
			newValue: editingCodes,
			prop: "multiple_security_code",
		}

		if (isCrypto) {
			baggage.prop = "crypto_currency_access_codes"
		}

		dispatch(editCredential(baggage))
	}, [editingCodes])

	if (option === 1) {
		return (
			<>
				<Grid item xs={12} className={classes.textCenter}>
					<Button
						size="large"
						color="primary"
						variant="contained"
						disableElevation
						onClick={handleClickOpen}
						data-testid="test_open_modal"
					>
						{translate("edit_codes", lng)}
					</Button>
				</Grid>
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={handleClose}
					aria-labelledby="edit-dialog"
					scroll="paper"
					data-testid="test_modal"
				>
					<DialogTitle id="edit-dialog">{translate("edit_codes", lng)}</DialogTitle>
					<DialogContent>
						<Grid container justify="space-around" spacing={4}>
							{editingCodes.map((code: string, index: number) => (
								<Grid key={index} item xs={12} md={6}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel>{index + 1}</InputLabel>
										<OutlinedInput
											id={`${isCrypto ? "word" : "code"}-${index}`}
											label={`${index + 1}`}
											value={code}
											onChange={handleChange}
											endAdornment={
												<InputAdornment position="end">
													<Tooltip
														title={translate("delete", lng)}
														placement="top"
													>
														<IconButton
															aria-label={translate(
																"edit_codes",
																lng,
																2
															)}
															onClick={() => removeCode(code)}
														>
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												</InputAdornment>
											}
											inputProps={{
												"data-testid": `test_${index}`,
											}}
										/>
									</FormControl>
								</Grid>
							))}

							<Grid item xs={12} className={classes.textCenter}>
								<Button
									variant="outlined"
									color="primary"
									onClick={() => setEditingCodes([...editingCodes, ""])}
								>
									{translate("edit_codes", lng, 1)}
								</Button>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="default">
							{translate("go_back", lng)}
						</Button>
						<Button onClick={handleClose} color="primary">
							{translate("access_management", lng, 2)}
						</Button>
					</DialogActions>
				</Dialog>
			</>
		)
	} else {
		return (
			<>
				<Grid container justify="space-around" spacing={4} data-testid="test_edit_codes">
					{editingCodes.map((code: string, index: number) => (
						<Grid key={index} item xs={12} md={6}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>{index + 1}</InputLabel>
								<OutlinedInput
									id={`${isCrypto ? "word" : "code"}-${index}`}
									label={`${index + 1}`}
									value={code}
									onChange={handleChange}
									endAdornment={
										<InputAdornment position="end">
											<Tooltip
												title={translate("delete", lng)}
												placement="top"
											>
												<IconButton
													aria-label={translate("edit_codes", lng, 2)}
													onClick={() => removeCode(code)}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</InputAdornment>
									}
									inputProps={{
										"data-testid": `test_${index}`,
									}}
								/>
							</FormControl>
						</Grid>
					))}

					<Grid item xs={12} className={classes.textCenter}>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => setEditingCodes([...editingCodes, ""])}
						>
							{translate("edit_codes", lng, 1)}
						</Button>
					</Grid>
				</Grid>
			</>
		)
	}
}

export default EditCodes
