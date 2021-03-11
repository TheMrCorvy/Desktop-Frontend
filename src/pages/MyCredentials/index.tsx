import React, { FC } from "react"

import {
	Container,
	Grid,
	Card,
	CardActionArea,
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
} from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

import MoreVertIcon from "@material-ui/icons/MoreVert"

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
		avatar: {
			backgroundColor: red[500],
			color: "white",
		},
		card: {
			background: theme.palette.type === "dark" ? theme.palette.background.default : "white",
			height: "100%",
			borderRadius: 10,
		},
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
		addCredential: {
			flexGrow: 1,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			height: "100%",
		},
		cardAlter: {
			borderStyle: "dashed",
			background: theme.palette.type === "dark" ? theme.palette.background.default : "white",
			height: "100%",
			borderRadius: 10,
			minHeight: "7rem",
		},
		grid: {
			marginLeft: 20,
			marginRight: 20,
			marginBottom: 20,
			marginTop: 20,
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
				<Grid container justify="space-around" spacing={3}>
					<OrderBar orderCredentials={orderBy} />
					<Grid xs={12} sm={6} md={4} className={classes.grid}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardContent>
									<CardHeader
										avatar={
											<Avatar aria-label="recipe" className={classes.avatar}>
												R
											</Avatar>
										}
										action={
											<IconButton>
												<MoreVertIcon />
											</IconButton>
										}
										title="Shrimp and Chorizo Paella"
										subheader="Has been recently seen"
										classes={{
											subheader: classes.textColor,
										}}
									/>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid xs={12} sm={6} md={4} className={classes.grid}>
						<Card
							className={(classes.addCredential, classes.cardAlter)}
							variant="outlined"
						>
							<CardActionArea className={classes.card}>
								<CardContent>
									<div className={classes.addCredential}>
										<MoreVertIcon />
									</div>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid xs={12} sm={6} md={4} className={classes.grid}>
						<Card
							className={(classes.addCredential, classes.cardAlter)}
							variant="outlined"
						>
							<CardActionArea className={classes.card}>
								<CardContent>
									<div className={classes.addCredential}>
										<MoreVertIcon />
									</div>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid xs={12} sm={6} md={4} className={classes.grid}>
						<Card
							className={(classes.addCredential, classes.cardAlter)}
							variant="outlined"
						>
							<CardActionArea className={classes.card}>
								<CardContent>
									<div className={classes.addCredential}>
										<MoreVertIcon />
									</div>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid xs={12} sm={6} md={4} className={classes.grid}>
						<Card
							className={(classes.addCredential, classes.cardAlter)}
							variant="outlined"
						>
							<CardActionArea className={classes.card}>
								<CardContent>
									<div className={classes.addCredential}>
										<MoreVertIcon />
									</div>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Container>
			<Downloads testing />
		</>
	)
}

export default MyCredentials
