import Recat from "react"

import {
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

export type ReviewCardT = {
	userName: {
		firstName: string
		lastName: string
	}
	date: string
	rating: {
		body: string
		rating: number
	}
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.26)" : "#f5f5f5",
		},
		avatar: {
			backgroundColor: red[500],
			color: "white",
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

const ReviewCard = ({ userName, date, rating }: ReviewCardT) => {
	const classes = useStyles()

	const avatar =
		userName.firstName.charAt(0).toUpperCase() + userName.lastName.charAt(0).toUpperCase()

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						{avatar}
					</Avatar>
				}
				title={userName.lastName + " " + userName.firstName}
				subheader={date}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{rating.body}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Rating name="read-only" value={rating.rating} precision={0.5} readOnly />
			</CardActions>
		</Card>
	)
}
export default ReviewCard
