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
	testing?: boolean
}

const DisplayData = ({ toggleDisplay, visible, testing }: Props): JSX.Element => {
	const { lng } = useSelector((state: RootState) => state.lng)

	return (
		<Tooltip title="titulo" placement="right">
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
