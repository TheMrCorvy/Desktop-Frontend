import react, { useState } from "react"

import { IconButton, Tooltip } from "@material-ui/core"

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

	const tooltipTitle = translate("access_management", lng, locked ? 1 : 2)

	return (
		<Tooltip title={tooltipTitle} placement="right">
			<IconButton color="primary" onClick={toggleLock} data-testid="test_toggle_lock">
				{locked ? <LockIcon /> : <LockOpenIcon />}
			</IconButton>
		</Tooltip>
	)
}
export default UnlockData
