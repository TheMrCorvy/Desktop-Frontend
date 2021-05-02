import react, { FC, useState } from "react"

/******************************************************************************** mui */
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

/******************************************************************************** redux */
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

/******************************************************************************** types & components */
import { ApiResponseLoginT } from "../../misc/types"

import LoginOptions from "../Sections/LoginOptions"

type Props = {
	toggleLock: () => void
	locked: boolean
	lockedTitle: string
	unlockedTitle: string
	testing?: boolean
}

const UnlockData: FC<Props> = ({ toggleLock, locked, lockedTitle, unlockedTitle, testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const fullScreen = useMediaQuery(useTheme().breakpoints.down("xs"))

	const toggleDialog = () => {
		if (locked && !testing) {
			setOpen(!open)
		} else {
			toggleLock()
		}
	}

	const onAuthSuccess = (res: ApiResponseLoginT) => {
		if (res.isAuthorized) {
			setOpen(false)

			toggleLock()
		}
	}

	const tooltipTitle = locked ? lockedTitle : unlockedTitle

	return (
		<>
			<Tooltip title={tooltipTitle} placement="right">
				<IconButton color="primary" onClick={toggleDialog} data-testid="test_toggle_lock">
					{locked ? <LockIcon /> : <LockOpenIcon />}
				</IconButton>
			</Tooltip>

			<Dialog
				onClose={toggleDialog}
				open={open}
				scroll="body"
				data-testid="test_dialog"
				maxWidth="md"
				fullScreen={fullScreen}
			>
				<DialogTitle>{translate("authorize", lng)}</DialogTitle>
				<DialogContent>
					<LoginOptions isRobot={false} onAuthSuccess={onAuthSuccess} endpointAlt />
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={toggleDialog}
						color="default"
						size="large"
						data-testid="test_go_back"
					>
						{translate("go_back", lng)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default UnlockData
