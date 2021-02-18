import Recat from "react"

import { Card, CardHeader, CardContent, CardActions, Avatar, Typography } from "@material-ui/core"

import { Rating } from "@material-ui/lab"

import { red } from "@material-ui/core/colors"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

export type OpinionCardT = {
	user: {
		firstName: string
		lastName: string
	}
	date: string
	opinion: {
		body: string
		isRating: boolean
		rating?: number
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

const OpinionCard = ({ user, date, opinion }: OpinionCardT) => {
	const classes = useStyles()

	const avatar = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()

	return (
		<Card data-testid="test_opinion_card">
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						{avatar}
					</Avatar>
				}
				title={user.lastName + " " + user.firstName}
				subheader={date}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{opinion.body}
				</Typography>
			</CardContent>
			{opinion.isRating && (
				<CardActions disableSpacing>
					<Rating name="read-only" value={opinion.rating} precision={0.5} readOnly />
				</CardActions>
			)}
		</Card>
	)
}
export default OpinionCard
