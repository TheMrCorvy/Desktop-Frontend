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

	const value: number = 9 / 2

	return (
		<div className={classes.root}>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={3} justify="space-around">
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h4" gutterBottom>
							What do our users think of PasuSewa?
						</Typography>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										E
									</Avatar>
								}
								title="Example Name"
								subheader="September 14, 2016"
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									This impressive paella is a perfect party dish and a fun meal to
									cook together with your guests. Add 1 cup of frozen peas along
									with the mussels, if you like.
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Rating name="read-only" value={value} precision={0.5} readOnly />
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										E
									</Avatar>
								}
								title="Example Name"
								subheader="September 14, 2016"
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									This impressive paella is a perfect party dish and a fun meal to
									cook together with your guests. Add 1 cup of frozen peas along
									with the mussels, if you like.
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Rating name="read-only" value={value} precision={0.5} readOnly />
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										E
									</Avatar>
								}
								title="Example Name"
								subheader="September 14, 2016"
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									This impressive paella is a perfect party dish and a fun meal to
									cook together with your guests. Add 1 cup of frozen peas along
									with the mussels, if you like.
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Rating name="read-only" value={value} precision={0.5} readOnly />
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										E
									</Avatar>
								}
								title="Example Name"
								subheader="September 14, 2016"
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									This impressive paella is a perfect party dish and a fun meal to
									cook together with your guests. Add 1 cup of frozen peas along
									with the mussels, if you like.
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Rating name="read-only" value={value} precision={0.5} readOnly />
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Card>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										E
									</Avatar>
								}
								title="Example Name"
								subheader="September 14, 2016"
							/>
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									This impressive paella is a perfect party dish and a fun meal to
									cook together with your guests. Add 1 cup of frozen peas along
									with the mussels, if you like.
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<Rating name="read-only" value={value} precision={0.5} readOnly />
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Reviews
