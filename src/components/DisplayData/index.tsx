import React from "react"

import { Fab, Tooltip } from "@material-ui/core"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

type Props = {
	toggleDisplay: (agent: string) => void
	visible: boolean
}

const DisplayData = ({ toggleDisplay, visible }: Props): JSX.Element => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const title = translate("info_is_visible", lng, !visible ? 1 : 0)

	const getUserAgent = () => {
		const userAgentInfo = navigator.userAgent

		const variosStrings = userAgentInfo.split("(")

		const stringFinal = variosStrings[1].split(")")

		toggleDisplay(stringFinal[0])
	}

	return (
		<Tooltip title={title} placement="right">
			<Fab
				color="secondary"
				onClick={() => getUserAgent()}
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
