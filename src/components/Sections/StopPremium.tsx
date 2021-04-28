import React, { FC } from "react"

import { Button, Grid, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		stopPremiumBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

const StopPremium: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<Grid item xs={12} style={{ marginTop: 25, textAlign: "center" }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h5">{translate("stop_premium", lng, 0)}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body2">{translate("stop_premium", lng, 1)}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body2">{translate("stop_premium", lng, 2)}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						disableElevation
						color="secondary"
						className={classes.stopPremiumBtn}
					>
						{translate("stop_premium", lng, 0)}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default StopPremium
