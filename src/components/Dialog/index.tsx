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

type Props = {
	children: ReactElement
	title: string
	tooltipPlacement:
		| "left"
		| "right"
		| "top"
		| "bottom"
		| "bottom-end"
		| "bottom-start"
		| "left-end"
		| "left-start"
		| "right-end"
		| "right-start"
		| "top-end"
		| "top-start"
	className?: any
}

const DialogComponent = (props: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const toggleDialog = () => {
		setOpen(!open)
	}

	return (
		<>
			<Tooltip title={translate("more_info", lng)} placement={props.tooltipPlacement}>
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
				scroll="paper"
			>
				<DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
				<DialogContent>
					<DialogContentText data-testid="dialog_content_text">
						{props.children}
					</DialogContentText>
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
