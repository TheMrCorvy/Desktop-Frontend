import React from "react"

import { Grid, Button, Typography, Divider, Hidden } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

type Props = {
	userRole: "free" | "semi-premium" | "premium" | "admin"
	canBuySlots: boolean
}

const useStyles = makeStyles({
	container: {
		marginTop: 150,
	},
	verticalDivider: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	text: {
		textAlign: "center",
	},
})

const UpdateRole = ({ userRole, canBuySlots }: Props) => {
	const classes = useStyles()

	if (userRole === "premium") {
		return null
	}

	return (
		<Grid item xs={12} className={classes.container}>
			<Grid container justify="space-around" spacing={4}>
				<Grid item xs={12}>
					<Divider orientation="horizontal" />
				</Grid>
				{canBuySlots && (
					<>
						<Grid item xs={12} md={5} className={classes.text}>
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<Typography variant="h5">Pagar Slots</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button variant="contained" color="secondary" disableElevation>
										modal
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button variant="contained" color="secondary" disableElevation>
										modal
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Hidden smDown>
							<Grid item xs={2} className={classes.verticalDivider}>
								<Divider orientation="vertical" flexItem />
							</Grid>
						</Hidden>
						<Hidden mdUp>
							<Grid item xs={12}>
								<Divider orientation="horizontal" />
							</Grid>
						</Hidden>
					</>
				)}
				<Grid item xs={12} md={5} className={classes.text}>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Typography variant="h5">Pagar Premium</Typography>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="secondary" disableElevation>
								modal
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="secondary" disableElevation>
								modal
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Divider orientation="horizontal" />
				</Grid>
				<Grid item>
					<Button variant="contained" color="secondary" disableElevation>
						modal
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default UpdateRole
