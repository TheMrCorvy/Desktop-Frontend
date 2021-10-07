import { FC, useState, useEffect } from "react"

import { Button, Divider, Grid } from "@material-ui/core"
import useStyles from "./styles"

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

type Props = {
	sortCredentials: Function
}

type OrderT = {
	by: By
	arrow: Arrow
	direction: Direction
}

export type By = "created_at" | "company_name" | "updated_at" | "last_seen"

export type Direction = 1 | -1

type Arrow = typeof ArrowUpwardIcon | typeof ArrowDownwardIcon

const OrderBar: FC<Props> = ({ sortCredentials }) => {
	const [order, setOrder] = useState<OrderT>({
		by: "company_name",
		arrow: ArrowDownwardIcon,
		direction: 1,
	})

	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	useEffect(() => {
		sortCredentials({
			by: order.by,
			direction: order.direction,
		})
	}, [])

	const orderBy = (by: By) => {
		let setArrow: Arrow

		let direction: Direction

		if (by === order.by) {
			if (order.arrow === ArrowDownwardIcon) {
				setArrow = ArrowUpwardIcon

				direction = -1 //down
			} else {
				setArrow = ArrowDownwardIcon

				direction = 1 //up
			}
		} else {
			setArrow = ArrowDownwardIcon

			direction = 1 //up
		}

		setOrder({
			by,
			arrow: setArrow,
			direction,
		})

		sortCredentials({ direction, by })
	}

	return (
		<>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order.by === "company_name" && <order.arrow />}
					onClick={() => orderBy("company_name")}
				>
					{translate("order_options", lng, 2)}
				</Button>
			</Grid>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={
						order.by === "created_at" && (
							<order.arrow data-testid="test_created_arrow" />
						)
					}
					onClick={() => orderBy("created_at")}
					data-testid="test_order_by_created"
				>
					{translate("order_options", lng, 0)}
				</Button>
			</Grid>
			<Grid item xs={6} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={
						order.by === "updated_at" && <order.arrow data-testid="test_edited_arrow" />
					}
					onClick={() => orderBy("updated_at")}
					data-testid="test_order_by_edited"
				>
					{translate("order_options", lng, 1)}
				</Button>
			</Grid>
			<Grid item xs={12} sm={3} className={classes.textCenter}>
				<Button
					color="inherit"
					endIcon={order.by === "last_seen" && <order.arrow />}
					onClick={() => orderBy("last_seen")}
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
