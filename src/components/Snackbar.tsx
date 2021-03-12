import React, { useState } from "react"
import { Snackbar as SnackbarMui } from "@material-ui/core"

type Props = {
	snackbarMessage: string
	open: boolean
	duration?: number
	verticalPosition?: "bottom" | "top"
	horizontalPosition?: "center" | "left" | "right"
}

const Snackbar = ({
	snackbarMessage,
	open,
	duration,
	verticalPosition,
	horizontalPosition,
}: Props) => {
	//this part is necessary to autohide the snackbar
	const [isOpen, setIsOpen] = useState<boolean>(open)

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<div>
			<SnackbarMui
				anchorOrigin={{
					vertical: verticalPosition ? verticalPosition : "bottom",
					horizontal: horizontalPosition ? horizontalPosition : "left",
				}}
				open={isOpen}
				autoHideDuration={duration ? duration : 6000}
				message={snackbarMessage}
				onClose={handleClose}
			/>
		</div>
	)
}

export default Snackbar
