import React, { FC, useState, useEffect } from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Downloads from "../../components/Sections/Downloads"
import OrderBar, { By, Direction } from "../../components/OrderBar"
import CredentialCard, { CredentialT } from "../../components/CredentialCard"

import { credential4Testing } from "../../components/Data4Testing"

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

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const [availableSlots, setAvailableSlots] = useState<number>(0)

	const { REACT_APP_ENV_LOCAL } = process.env

	useEffect(() => {
		if (REACT_APP_ENV_LOCAL) {
			setCredentials(credential4Testing)

			setAvailableSlots(4)
		} else {
			// get this data from the indexedDB
		}
	}, [])

	const orderBy = (order: Order) => {
		console.log(order)
	}

	return (
		<>
			<Container maxWidth="lg" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					<OrderBar orderCredentials={orderBy} />
					<CredentialCard availableSlots={availableSlots} credentials={credentials} />
				</Grid>
			</Container>
			<Downloads testing />
		</>
	)
}

export default MyCredentials
