import React from "react"

import { IconButton, Tooltip } from "@material-ui/core"

import Brightness4Icon from "@material-ui/icons/Brightness4"
import NightsStayIcon from "@material-ui/icons/NightsStay"

import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../../../redux/actions/themeActions"
import { RootState } from "../../../../redux/store"

import { translate } from "../../../../lang"

const ToggleDarkTheme = ({ ...rest }) => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const toggleDarkTheme = () => {
		if (theme === "dark") {
			dispatch(setTheme("light"))
		} else {
			dispatch(setTheme("dark"))
		}
	}

	return (
		<Tooltip title={translate("toggle_dark_theme", lng)}>
			<IconButton edge="end" color="inherit" onClick={toggleDarkTheme} {...rest}>
				{theme === "dark" ? <Brightness4Icon /> : <NightsStayIcon />}
			</IconButton>
		</Tooltip>
	)
}

export default ToggleDarkTheme
