import React, { FC } from "react"

import { Button } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import { useHistory } from "react-router-dom"

const GoBackBtn: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const history = useHistory()

	return (
		<Button
			color="secondary"
			variant="contained"
			disableElevation
			size="small"
			onClick={() => history.goBack()}
		>
			{translate("go_back", lng)}
		</Button>
	)
}

export default GoBackBtn
