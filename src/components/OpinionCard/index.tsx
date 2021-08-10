import { FC } from "react"

import { Card, CardHeader, CardContent, CardActions, Avatar, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { Rating } from "@material-ui/lab"

import { OpinionCardT } from "../../misc/types"

const OpinionCard: FC<OpinionCardT> = ({ user, date, opinion }) => {
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
				classes={{
					subheader: classes.textColor,
				}}
			/>
			<CardContent>
				<Typography
					variant="body2"
					color="textSecondary"
					component="p"
					data-testid="test_card_body"
					className={classes.textColor}
				>
					{opinion.body}
				</Typography>
			</CardContent>
			{opinion.isRating && (
				<CardActions disableSpacing data-testid="test_opinion_rating">
					<Rating name="read-only" value={opinion.rating} precision={0.5} readOnly />
				</CardActions>
			)}
		</Card>
	)
}
export default OpinionCard
