import React, { useState } from "react"

import { Button, Divider, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

export type By = "created" | "name" | "edited" | "recently"

const useStyles = makeStyles({
	textCenter: {
		textAlign: "center",
	},
	topDivider: {
		marginBottom: "6rem",
	},
})

const OrderBar = ({ orderCredentials }: { orderCredentials: Function }) => {
	const [order, setOrder] = useState<By>("created")

	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const orderBy = (by: By) => {
		setOrder(by)

		orderCredentials(by)
	}

	return (
		<>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order === "created" && <ArrowDownwardIcon />}
					onClick={() => orderBy("created")}
				>
					{translate("order_options", lng, 0)}
				</Button>
			</Grid>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order === "edited" && <ArrowDownwardIcon />}
					onClick={() => orderBy("edited")}
				>
					{translate("order_options", lng, 1)}
				</Button>
			</Grid>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order === "name" && <ArrowDownwardIcon />}
					onClick={() => orderBy("name")}
				>
					{translate("order_options", lng, 2)}
				</Button>
			</Grid>
			<Grid item xs={12} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order === "recently" && <ArrowDownwardIcon />}
					onClick={() => orderBy("recently")}
				>
					{translate("order_options", lng, 3)}
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Divider className={classes.topDivider} />
			</Grid>
		</>
	)
}

export default OrderBar
