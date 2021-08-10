import { useState, MouseEvent } from "react"

import { IconButton, Tooltip, Menu, MenuItem } from "@material-ui/core"

import TranslateIcon from "@material-ui/icons/Translate"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { translate } from "../../../../lang"
import { setLanguage } from "../../../../redux/actions/langActions"

const TranslateButton = ({ ...rest }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (value: string) => {
		setAnchorEl(null)

		if (value !== "no change") {
			dispatch(setLanguage(value))
		}
	}

	return (
		<>
			<Tooltip title={translate("translate", lng)}>
				<IconButton
					aria-controls="lang-menu"
					aria-haspopup="true"
					color="inherit"
					onClick={handleClick}
					{...rest}
				>
					<TranslateIcon />
				</IconButton>
			</Tooltip>
			<Menu
				id="lang-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={() => handleClose("no change")}
			>
				<MenuItem data-testid="test_translation_to_en" onClick={() => handleClose("en")}>
					EN
				</MenuItem>
				<MenuItem data-testid="test_translation_to_es" onClick={() => handleClose("es")}>
					ES
				</MenuItem>
				<MenuItem data-testid="test_translation_to_jp" onClick={() => handleClose("jp")}>
					JP
				</MenuItem>
			</Menu>
		</>
	)
}

export default TranslateButton
