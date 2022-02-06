import { FC, ReactElement, useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import {
	Fab,
	Tooltip,
	Dialog,
	DialogTitle,
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
	tooltipTitle?: string
}

/**
 * @alias Dialog
 *
 * @description A customizable call to action button that opens a dynamic dialog with the text as the children of the component
 *
 * @property {ReactElement} children The text that will be shown once the dialog opened
 *
 * @property {string} title The title of the dialog
 *
 * @property {"left" | "right" | "top" | "bottom" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"} tooltipPlacement The position where the tooltip will be
 *
 * @property {any} [className] The custom className that will be applied to the button
 *
 * @property {string} [tooltipTitle] The title for the tooltip
 *
 * @example
 *
 * <DialogComponent
 * 			title="title of the dialog"
 * 			tooltipPlacement="top"
 * 			className={classes.yourClassName}
 * 			tooltipTitle="title for the tooltip"
 *  >
 * 		<>
 * 			<p> lorem ipsum </p>
 * 			<p> lorem ipsum 2 </p>
 * 		</>
 *  </DialogComponent>
 */

const DialogComponent: FC<Props> = ({
	children,
	title,
	tooltipPlacement,
	className,
	tooltipTitle,
}) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const toggleDialog = () => {
		setOpen(!open)
	}

	return (
		<>
			<Tooltip
				title={tooltipTitle ? tooltipTitle : translate("more_info", lng)}
				placement={tooltipPlacement}
			>
				<Fab
					color="secondary"
					aria-label="help"
					size="small"
					className={className}
					onClick={toggleDialog}
				>
					<HelpOutlineIcon />
				</Fab>
			</Tooltip>

			<Dialog
				onClose={toggleDialog}
				aria-labelledby="dialog-title"
				open={open}
				scroll="paper"
				data-testid="test_dialog"
			>
				<DialogTitle id="dialog-title" data-testid="test_dialog_title">
					{title}
				</DialogTitle>
				<DialogContent>{children}</DialogContent>
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
