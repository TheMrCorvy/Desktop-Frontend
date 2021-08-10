import { FC } from "react"

import { Button, Grid, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

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
