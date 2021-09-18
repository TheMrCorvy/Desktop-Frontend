import { FC } from "react"

import { Card, CardHeader, CardContent, CardActions, Avatar, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { Rating } from "@material-ui/lab"

import { OpinionCardT } from "../../misc/types"

const OpinionCard: FC<OpinionCardT> = ({ user_name, body, rating, type }) => {
	const classes = useStyles()

	const avatar = user_name.charAt(0).toUpperCase() + user_name.charAt(1).toUpperCase()

	return (
		<Card data-testid="test_opinion_card">
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						{avatar}
					</Avatar>
				}
				title={user_name}
				classes={{
					title: classes.title,
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
					{body}
				</Typography>
			</CardContent>
			{!type && (
				<CardActions disableSpacing data-testid="test_opinion_rating">
					<Rating name="read-only" value={rating} precision={0.5} readOnly />
				</CardActions>
			)}
		</Card>
	)
}
export default OpinionCard
