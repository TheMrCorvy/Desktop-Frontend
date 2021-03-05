import React, { FC } from "react"

import { Typography } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import DialogComponent from "../Dialog"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		antiFishingDialog: {
			boxShadow: "none",
			background: theme.palette.primary.main,
			"&:hover": {
				background: theme.palette.primary.main,
			},
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
	})
)

const AntiFishingDialog: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()
	return (
		<DialogComponent
			title={translate("anti_fishing_texts", lng, 0)}
			tooltipPlacement="top"
			className={classes.antiFishingDialog}
		>
			<>
				<Typography paragraph variant="body2" gutterBottom>
					{translate("anti_fishing_texts", lng, 1)}
				</Typography>
				<Typography paragraph variant="body2" gutterBottom>
					{translate("anti_fishing_texts", lng, 2)}
				</Typography>
				<Typography paragraph variant="body2" gutterBottom>
					{translate("anti_fishing_texts", lng, 3)}
				</Typography>
				<Typography paragraph variant="body2" gutterBottom>
					{translate("anti_fishing_texts", lng, 4)}
				</Typography>
			</>
		</DialogComponent>
	)
}

export default AntiFishingDialog
