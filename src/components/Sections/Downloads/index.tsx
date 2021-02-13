import React, { FC } from "react"

import { Container, Grid, Button, Typography, Divider, Hidden } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { purple, indigo, pink } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		linuxBtn: {
			backgroundColor: purple[400],
			"&:hover": {
				backgroundColor: purple[500],
			},
		},
		webBtn: {
			backgroundColor: indigo["A400"],
			"&:hover": {
				backgroundColor: indigo["A700"],
			},
		},
		androidBtn: {
			backgroundColor: pink[500],
			"&:hover": {
				backgroundColor: pink[600],
			},
		},
		container: {
			paddingTop: 45,
			paddingBottom: 500,
			textAlign: "center",

			[theme.breakpoints.down("xs")]: {
				paddingTop: 0,
			},
		},
		marginB: {
			marginBottom: 30,
		},
	})
)

const Downloads: FC = () => {
	const classes = useStyles()

	return (
		<Container maxWidth="lg" className={classes.container} id="downloads-section">
			<Grid container justify="center" spacing={6}>
				<Grid item xs={12}>
					<Typography gutterBottom variant="h4" className={classes.marginB}>
						Downloads
					</Typography>
				</Grid>

				<Grid item xs={12} sm={5} lg={2}>
					<Grid container justify="space-between" spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								Web Version
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								Install
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Hidden xsDown>
					<Divider orientation="vertical" flexItem />
				</Hidden>

				<Hidden smUp>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Hidden>

				<Grid item xs={12} sm={5} lg={3}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								Desktop
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" color="primary">
								PC
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" color="secondary">
								Mac
							</Button>
						</Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								color="primary"
								className={classes.linuxBtn}
							>
								Linux
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Hidden only={["xs", "lg", "xl"]}>
					<Grid item xs={6}>
						<Divider orientation="horizontal" />
					</Grid>
					<Grid item xs={6}>
						<Divider orientation="horizontal" />
					</Grid>
				</Hidden>

				<Hidden mdDown>
					<Divider orientation="vertical" flexItem />
				</Hidden>

				<Hidden smUp>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Hidden>

				<Grid item xs={12} sm={5} lg={3}>
					<Grid container justify="space-between" spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								Android
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								className={classes.androidBtn}
							>
								Play Store
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								Install
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Hidden smUp>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Hidden>

				<Hidden xsDown>
					<Divider orientation="vertical" flexItem />
				</Hidden>

				<Grid item xs={12} sm={5} lg={2}>
					<Grid container justify="space-between" spacing={1}>
						<Grid item xs={12}>
							<Typography gutterBottom variant="h5">
								IOS
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								Install
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Downloads
