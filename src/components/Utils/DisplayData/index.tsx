import { FC } from "react"

import { Fab, Tooltip } from "@material-ui/core"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

const DisplayData: FC<Props> = ({ toggleDisplay, visible }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const title = translate("info_is_visible", lng, !visible ? 1 : 0)

	return (
		<Tooltip title={title} placement="right">
			<Fab
				color="secondary"
				onClick={() => toggleDisplay()}
				data-testid="test_visibility_btn"
				size="small"
				style={{ boxShadow: "none" }}
			>
				{visible ? <VisibilityOffIcon /> : <VisibilityIcon data-testid="test_is_visible" />}
			</Fab>
		</Tooltip>
	)
}

type Props = {
	toggleDisplay: () => void
	visible: boolean
}

export default DisplayData
