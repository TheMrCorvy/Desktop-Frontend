import React, { useState } from "react"
import { Snackbar as SnackbarMui } from "@material-ui/core"

const Snackbar = ({ snackbarMessage, open }: { snackbarMessage: string; open: boolean }) => {
	//this part is necessary to autohide the snackbar
	const [isOpen, setIsOpen] = useState<boolean>(open)

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<div>
			<SnackbarMui
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={isOpen}
				autoHideDuration={6000}
				message={snackbarMessage}
				onClose={handleClose}
			/>
		</div>
	)
}

export default Snackbar
