import React, { FC, useState } from "react"

import { Button, Container, Divider, Grid, Paper, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Downloads from "../../components/Sections/Downloads"

type OrderT = {
	by: By
	arrow: Arrow
	direction: Direction
}

type By = "created" | "name" | "edited" | "recently"

type Direction = "up" | "down"

type Arrow = typeof ArrowUpwardIcon | typeof ArrowDownwardIcon

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textCenter: {
			textAlign: "center",
		},
		topBar: {
			paddingTop: "6rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
		topDivider: {
			marginBottom: "6rem",
		},
	})
)

const MyCredentials: FC = () => {
	const [order, setOrder] = useState<OrderT>({
		by: "created",
		arrow: ArrowUpwardIcon,
		direction: "up",
	})

	const { theme } = useSelector((state: RootState) => state.theme)

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
	}

	return (
		<>
			<Container maxWidth="lg" className={classes.topBar}>
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
			</Container>
			<Downloads testing />
		</>
	)
}

export default MyCredentials
