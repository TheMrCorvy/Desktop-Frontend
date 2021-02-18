import React, { FC } from "react"

import {
	Container,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Avatar,
	Typography,
	Grid,
} from "@material-ui/core"

import { Rating } from "@material-ui/lab"

import { red } from "@material-ui/core/colors"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import ReviewCard, { ReviewCardT } from "./ReviewCard"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.26)" : "#f5f5f5",
		},
		avatar: {
			backgroundColor: red[500],
		},
		container: {
			paddingTop: "3rem",
			paddingBottom: "3rem",
		},
		textCenter: {
			textAlign: "center",
		},
		divider: {
			marginBottom: "5rem",
		},
	})
)

const Reviews: FC = () => {
	const classes = useStyles()

	//here will be an api call to fetch these reviews
	const userReviews: ReviewCardT[] = [
		{
			userName: "Example Name 1",
			date: "September 14, 2016",
			rating: {
				body:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
				rating: 2.5,
			},
		},
		{
			userName: "fxample Name 2",
			date: "September 14, 2016",
			rating: {
				body:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
				rating: 2.5,
			},
		},
		{
			userName: "Example Name 3",
			date: "September 14, 2016",
			rating: {
				body:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
				rating: 2.5,
			},
		},
		{
			userName: "Example Name 4",
			date: "September 14, 2016",
			rating: {
				body:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
				rating: 2.5,
			},
		},
		{
			userName: "Example Name 5",
			date: "September 14, 2016",
			rating: {
				body:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
				rating: 2.5,
			},
		},
	]

	return (
		<div className={classes.root}>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={3} justify="space-around">
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h4" gutterBottom>
							What do our users think of PasuSewa?
						</Typography>
					</Grid>
					{userReviews.map((review, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<ReviewCard {...review} />
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	)
}

export default Reviews
