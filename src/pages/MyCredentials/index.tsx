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
	Typography,
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
			borderRadius: 8,
		},
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
		lineHeight: {
			lineHeight: 1.5,
		},
		addCredential: {
			flexGrow: 1,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			minHeight: "100%",
		},
		cardAlter: {
			borderStyle: "dashed",
			background: theme.palette.type === "dark" ? theme.palette.background.default : "white",
			height: "100%",
			borderRadius: 8,
			minHeight: "7rem",
		},
		cardAction: {
			minHeight: "100%",
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
				<Grid container justify="space-around" spacing={4}>
					<OrderBar orderCredentials={orderBy} />
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card}>
							<CardActionArea className={classes.cardAction}>
								<CardContent>
									<Grid container spacing={2}>
										<Grid item xs={2} className={classes.addCredential}>
											<Avatar aria-label="recipe" className={classes.avatar}>
												R
											</Avatar>
										</Grid>
										<Grid item xs={8}>
											<Typography
												variant="subtitle1"
												paragraph
												gutterBottom
												className={classes.lineHeight}
											>
												Name of the credential the user created
											</Typography>
											<Typography
												variant="body1"
												className={classes.textColor}
											>
												Has been recently seen
											</Typography>
										</Grid>
										<Grid item xs={2} className={classes.addCredential}>
											<MoreVertIcon />
										</Grid>
									</Grid>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
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
