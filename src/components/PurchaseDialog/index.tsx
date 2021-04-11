import React, { useState, ChangeEvent } from "react"

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	useMediaQuery,
} from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import PurchaseButton from "./PurchaseButton"

type Props = {
	method: Method
	type: PurchaseType
}

type Method = "PayPal" | "Crypto"

type PurchaseType = "premium" | "slots"

const useStyles = makeStyles({
	btn: {
		textTransform: "none",
		"&:hover": {
			boxShadow:
				"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
		},
	},
	formControl: {
		marginBottom: 20,
	},

	continueBtn: {
		borderColor: "#1ebd2d",
		color: "#1ebd2d",
		"&:hover": {
			borderColor: "#1cad29",
			backgroundColor: "rgba(30,189,45, 0.1)",
			color: "#1cad29",
		},
	},
})

const PurchaseDialog = ({ method, type }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)
	const [amount, setAmount] = useState(1)
	const [step, setStep] = useState(1)

	const classes = useStyles()

	const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"))

	const startAdornment = type === "slots" ? "$10 X" : "$5 X"

	const endAdornment = translate("update_role_texts", lng, type === "slots" ? 7 : 8)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newAmount = Number(event.target.value)

		if (newAmount <= 0) {
			setAmount(1)
		} else {
			setAmount(newAmount)
		}
	}

	return (
		<>
			<Button
				variant="contained"
				color={method === "Crypto" ? "primary" : "secondary"}
				disableElevation
				size="large"
				className={classes.btn}
				onClick={() => setOpen(!open)}
			>
				{method}
			</Button>

			<Dialog
				onClose={() => setOpen(!open)}
				aria-labelledby="dialog-title"
				open={open}
				scroll="paper"
				data-testid="test_dialog"
				fullWidth
				fullScreen={fullScreen}
			>
				<DialogTitle id="dialog-title" data-testid="test_dialog_title">
					{translate("update_role_titles", lng, 7)}
				</DialogTitle>
				<DialogContent>
					{step === 1 ? (
						<>
							<FormControl fullWidth className={classes.formControl}>
								<InputLabel htmlFor="modal-input" color="secondary">
									{translate("amount", lng)}
								</InputLabel>
								<Input
									color="secondary"
									id="modal-input"
									value={amount}
									startAdornment={
										<InputAdornment position="start">
											{startAdornment}
										</InputAdornment>
									}
									type="number"
									endAdornment={
										<InputAdornment position="end">
											{endAdornment}
										</InputAdornment>
									}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl fullWidth className={classes.formControl}>
								<Button
									variant="outlined"
									className={classes.continueBtn}
									onClick={() => setStep(2)}
								>
									{translate("continue", lng)}
								</Button>
							</FormControl>
						</>
					) : (
						<PurchaseButton
							amount={amount}
							type={type}
							method={method}
							goBack={() => setStep(1)}
							cancelBtn={translate("go_back", lng, 0)}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={() => setOpen(!open)} color="default" size="large">
						{translate("go_back", lng, 1)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default PurchaseDialog
