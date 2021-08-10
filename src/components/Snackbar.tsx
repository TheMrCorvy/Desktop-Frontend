import { FC, useState } from "react"
import { Snackbar as SnackbarMui } from "@material-ui/core"

type Props = {
	message: string
	open: boolean
	duration?: number
	verticalPosition?: "bottom" | "top"
	horizontalPosition?: "center" | "left" | "right"
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

const Snackbar: FC<Props> = ({ message, open, duration, verticalPosition, horizontalPosition }) => {
	//this part is necessary to autohide the snackbar
	const [isOpen, setIsOpen] = useState<boolean>(open)

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<SnackbarMui
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
}

export default Snackbar
