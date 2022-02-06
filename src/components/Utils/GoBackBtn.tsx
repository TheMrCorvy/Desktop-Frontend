import { FC } from "react"

import { Button } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { useHistory } from "react-router-dom"

const GoBackBtn: FC<Props> = ({ altText, altColor }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const history = useHistory()

	return (
		<Button
			color={altColor ? altColor : "secondary"}
			variant="contained"
			disableElevation
			size="small"
			onClick={() => history.goBack()}
		>
			{!altText ? translate("go_back", lng) : altText}
		</Button>
	)
}

type Props = {
	altText?: string
	altColor?: "default" | "inherit" | "primary" | "secondary"
}

export default GoBackBtn
