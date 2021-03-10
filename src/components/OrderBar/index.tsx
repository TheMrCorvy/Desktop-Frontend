import React, { useState } from "react"

import { Button, Divider, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

type OrderT = {
	by: By
	arrow: Arrow
	direction: Direction
}

export type By = "created" | "name" | "edited" | "recently"

export type Direction = "up" | "down"

type Arrow = typeof ArrowUpwardIcon | typeof ArrowDownwardIcon

const useStyles = makeStyles({
	textCenter: {
		textAlign: "center",
	},
	topDivider: {
		marginBottom: "6rem",
	},
})

const OrderBar = ({ orderCredentials }: { orderCredentials: Function }) => {
	const [order, setOrder] = useState<OrderT>({
		by: "created",
		arrow: ArrowUpwardIcon,
		direction: "up",
	})

	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const orderBy = (by: By) => {
		let setArrow: Arrow

		let direction: Direction

		if (by === order.by) {
			if (order.arrow === ArrowUpwardIcon) {
				setArrow = ArrowDownwardIcon

				direction = "down"
			} else {
				setArrow = ArrowUpwardIcon

				direction = "up"
			}
		} else {
			setArrow = ArrowUpwardIcon

			direction = "up"
		}

		setOrder({
			by,
			arrow: setArrow,
			direction,
		})

		orderCredentials({ direction, by })
	}

	return (
		<Grid container justify="space-around" spacing={4}>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order.by === "created" && <order.arrow />}
					onClick={() => orderBy("created")}
				>
					order by created
				</Button>
			</Grid>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order.by === "edited" && <order.arrow />}
					onClick={() => orderBy("edited")}
				>
					order by edited
				</Button>
			</Grid>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order.by === "name" && <order.arrow />}
					onClick={() => orderBy("name")}
				>
					order by name
				</Button>
			</Grid>
			<Grid item xs={12} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order.by === "recently" && <order.arrow />}
					onClick={() => orderBy("recently")}
				>
					recently viewed
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Divider className={classes.topDivider} />
			</Grid>
		</Grid>
	)
}

export default OrderBar
