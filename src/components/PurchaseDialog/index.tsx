import { FC, useState, ChangeEvent } from "react"

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

import useStyles from "./styles"
import { useTheme } from "@material-ui/core/styles"

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

/**
 * @alias PurchaseDialog
 *
 * @description This component will calculate the prices for the user's purchase, and load them into the {@link PurchaseButton}
 *
 * @property {"PayPal" | "Crypto"} method How is the user going to pay?
 *
 * @property {"premium" | "slots"} type What the user is going to buy
 */

const PurchaseDialog: FC<Props> = ({ method, type }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)
	const [amount, setAmount] = useState<"" | number>("")
	const [step, setStep] = useState(1)

	const classes = useStyles()

	const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"))

	const startAdornment = type === "slots" ? "$10 X" : "$5 X"

	const endAdornment = translate("update_role_texts", lng, type === "slots" ? 7 : 8)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newAmount = Number(event.target.value)

		if (event.target.value === "") {
			setAmount("")
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
								<InputLabel htmlFor="modal-input">
									{translate("amount", lng)}
								</InputLabel>
								<Input
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
									disabled={!amount}
									variant="outlined"
									className={classes.continueBtn}
									onClick={() => setStep(2)}
								>
									{translate("continue", lng)}
								</Button>
							</FormControl>
						</>
					) : (
						amount !== "" && (
							<PurchaseButton
								amount={amount}
								type={type}
								method={method}
								goBack={() => setStep(1)}
							/>
						)
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
