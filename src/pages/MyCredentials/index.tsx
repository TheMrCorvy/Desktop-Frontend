import React, { FC } from "react"

import { Container } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Downloads from "../../components/Sections/Downloads"
import OrderBar, { By, Direction } from "../../components/OrderBar"

type Order = {
	by: By
	direction: Direction
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: "6rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
	})
)

const MyCredentials: FC = () => {
	const classes = useStyles()

	const orderBy = (order: Order) => {
		console.log(order)
	}

	return (
		<>
			<Container maxWidth="lg" className={classes.container}>
				<OrderBar orderCredentials={orderBy} />
			</Container>
			<Downloads testing />
		</>
	)
}

export default MyCredentials
