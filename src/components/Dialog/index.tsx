import React, { ReactElement, useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import {
	Fab,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core"

import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

const DialogComponent = (props: { children: ReactElement; className?: any }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const toggleDialog = () => {
		setOpen(!open)
	}

	return (
		<>
			<Tooltip title={translate("more_info", lng)} placement="left">
				<Fab
					color="secondary"
					aria-label="help"
					size="small"
					className={props.className}
					onClick={toggleDialog}
				>
					<HelpOutlineIcon />
				</Fab>
			</Tooltip>

			<Dialog
				onClose={toggleDialog}
				aria-labelledby="simple-dialog-title"
				open={open}
				scroll="body"
			>
				<DialogTitle id="simple-dialog-title">
					{translate("about_subtitle", lng)}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>{props.children}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={toggleDialog} color="default" size="large">
						{translate("go_back", lng)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DialogComponent
