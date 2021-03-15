import React, { useState } from "react"
import { Snackbar as SnackbarMui } from "@material-ui/core"

type Props = {
	message: string
	open: boolean
	duration?: number
	verticalPosition?: "bottom" | "top"
	horizontalPosition?: "center" | "left" | "right"
}

const Snackbar = ({ message, open, duration, verticalPosition, horizontalPosition }: Props) => {
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
