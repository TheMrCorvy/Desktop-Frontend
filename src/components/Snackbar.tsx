import { FC, useState } from "react"
import { Snackbar as MuiSnackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"

const Snackbar: FC<Props> = (props) => {
	const { message, open, duration, verticalPosition, horizontalPosition, isError } = props

	//this part is necessary to auto-hide the snackbar
	const [isOpen, setIsOpen] = useState<boolean>(open)

	const handleClose = () => {
		setIsOpen(false)
	}

	if (!isError) {
		return (
			<MuiSnackbar
				anchorOrigin={{
					vertical: verticalPosition ? verticalPosition : "bottom",
					horizontal: horizontalPosition ? horizontalPosition : "left",
				}}
				open={isOpen}
				autoHideDuration={duration && duration > 1000 ? duration : 6000}
				message={message}
				onClose={handleClose}
				data-testid="test_snackbar"
			/>
		)
	} else {
		return (
			<MuiSnackbar
				anchorOrigin={{
					vertical: verticalPosition ? verticalPosition : "bottom",
					horizontal: horizontalPosition ? horizontalPosition : "left",
				}}
				open={isOpen}
				autoHideDuration={duration && duration > 1000 ? duration : 6000}
				message={message}
				onClose={handleClose}
				data-testid="test_snackbar"
			>
				<MuiAlert elevation={6} variant="filled" severity="error">
					{message}
				</MuiAlert>
			</MuiSnackbar>
		)
	}
}

type Props = {
	open: boolean
	message: string
	duration?: number
	verticalPosition?: "bottom" | "top"
	horizontalPosition?: "center" | "left" | "right"
	isError?: boolean
}

/**
 * @alias Snackbar
 *
 * @property {string} message The message that will be shown on the snackbar
 *
 * @property {boolean} open The initial state for the snackbar
 *
 * @property {number} [duration] The time in milliseconds that the snackbar will be open. Must be greater than 1000. Default is 6000
 *
 * @property {"bottom" | "top"} [verticalPosition] Where in the Y axis will be located
 *
 * @property {"center" | "left" | "right"} [horizontalPosition] Where in the X axis will be located
 *
 * @example
 *
 * 	<Snackbar
 * 		open={true}
 * 		message={"a long message for the user"}
 * 		duration={30000}
 * 		verticalPosition="bottom"
 * 		horizontalPosition="left"
 * 	/>
 */

export default Snackbar
