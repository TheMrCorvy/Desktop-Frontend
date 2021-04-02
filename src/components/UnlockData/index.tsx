import react, { useState } from "react"

import {
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	useMediaQuery,
} from "@material-ui/core"

import { useTheme } from "@material-ui/core/styles"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Login from "../../components/Sections/Login"

type Props = {
	toggleLock: () => void
	locked: boolean
}

const UnlockData = ({ toggleLock, locked }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"))

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
				scroll="body"
				data-testid="test_dialog"
				maxWidth="md"
				fullScreen={fullScreen}
			>
				<DialogTitle id="dialog-title">titulo</DialogTitle>
				<DialogContent>
					<Login isRobot={false} />
					{/* <Button variant="contained" color="primary" onClick={onAuthSuccess}>
						auth succeded
					</Button> */}
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
