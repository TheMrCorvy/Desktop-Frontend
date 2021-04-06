import React from "react"

import { IconButton, Tooltip } from "@material-ui/core"

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
			<IconButton color="primary" onClick={toggleDisplay} data-testid="test_toggle_display">
				{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
			</IconButton>
		</Tooltip>
	)
}

export default DisplayData
