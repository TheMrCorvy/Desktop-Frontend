import React from "react"

import { Fab, Tooltip } from "@material-ui/core"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

type Props = {
	toggleDisplay: () => void
	visible: boolean
}

const DisplayData = ({ toggleDisplay, visible }: Props): JSX.Element => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const title = translate("info_is_visible", lng, !visible ? 0 : 1)

	return (
		<Tooltip title={title} placement="right">
			<Fab
				color="secondary"
				onClick={toggleDisplay}
				data-testid="test_toggle_display"
				size="small"
				style={{ boxShadow: "none" }}
			>
				{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
			</Fab>
		</Tooltip>
	)
}

export default DisplayData
