import React, { FC } from "react"

import { Grid, Typography, Divider, Hidden } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import DialogComponent from "../Dialog"
import PurchaseDialog from "../PurchaseDialog"

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
	listItem: {
		marginBottom: "3rem",
	},
	flatBtn: {
		boxShadow: "none",
	},
})

/**
 * @alias Section_UpdateRole
 *
 * @description This component will show the {@link PurchaseDialog} and must receive the following props:
 *
 * @property {"free" | "semi-premium" | "premium" | "admin"} userRole The user's role
 *
 * @property {boolean} canBuySlots If the user is actually allowed to buy more solts
 */

const UpdateRole: FC<Props> = ({ userRole, canBuySlots }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

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
									<Typography variant="h5">
										{translate("update_role_titles", lng, 0)}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<PurchaseDialog method="PayPal" type="slots" />
								</Grid>
								<Grid item xs={12}>
									<PurchaseDialog method="Crypto" type="slots" />
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
							<Typography variant="h5">
								{translate("update_role_titles", lng, 1)}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<PurchaseDialog method="PayPal" type="premium" />
						</Grid>
						<Grid item xs={12}>
							<PurchaseDialog method="Crypto" type="premium" />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Divider orientation="horizontal" />
				</Grid>
				<Grid item>
					<DialogComponent
						title={translate("update_role_titles", lng, 2)}
						tooltipPlacement="bottom"
						className={classes.flatBtn}
					>
						<ul>
							<li className={classes.listItem}>
								<Typography variant="body1" paragraph>
									{translate("update_role_titles", lng, 3)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 0)}
								</Typography>
							</li>
							<li className={classes.listItem}>
								<Typography variant="body1" paragraph>
									{translate("update_role_titles", lng, 4)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 1)}
								</Typography>
							</li>
							<li className={classes.listItem}>
								<Typography variant="body1" paragraph>
									{translate("update_role_titles", lng, 5)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 2)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 3)}
								</Typography>
							</li>
							<li className={classes.listItem}>
								<Typography variant="body1" paragraph>
									{translate("update_role_titles", lng, 6)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 4)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 5)}
								</Typography>
								<Typography variant="body2" paragraph>
									{translate("update_role_texts", lng, 6)}
								</Typography>
							</li>
						</ul>
					</DialogComponent>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default UpdateRole
