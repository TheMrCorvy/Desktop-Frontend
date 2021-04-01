import react, { useState } from "react"

import {
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

type Props = {
	toggleLock: () => void
	locked: boolean
}

const UnlockData = ({ toggleLock, locked }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const toggleDialog = () => {
		if (locked) {
			setOpen(!open)
		} else {
			toggleLock()
		}
	}

	const onAuthSuccess = () => {
		setOpen(false)

		toggleLock()
	}

	const tooltipTitle = translate("access_management", lng, locked ? 1 : 2)

	return (
		<>
			<Tooltip title={tooltipTitle} placement="right">
				<IconButton color="primary" onClick={toggleDialog} data-testid="test_toggle_lock">
					{locked ? <LockIcon /> : <LockOpenIcon />}
				</IconButton>
			</Tooltip>

			<Dialog
				onClose={toggleDialog}
				aria-labelledby="dialog-title"
				open={open}
				scroll="paper"
				data-testid="test_dialog"
			>
				<DialogTitle id="dialog-title">titulo</DialogTitle>
				<DialogContent>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum consectetur quas
					in cumque consequuntur nesciunt molestiae ex eligendi sapiente saepe quidem,
					reprehenderit ut aliquid, neque autem totam alias officia repellat?
					<Button onClick={onAuthSuccess}>auth succeded</Button>
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
export default UnlockData
