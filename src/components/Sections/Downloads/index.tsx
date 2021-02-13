import React, { FC } from "react"

import { Container, Grid, Button, Typography, Divider, Hidden } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { purple, indigo } from "@material-ui/core/colors"

const useStyles = makeStyles({
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
})

const Downloads: FC = () => {
	const classes = useStyles()

	return (
		<Container maxWidth="lg" style={{ textAlign: "center" }} id="downloads-section">
			<Grid
				container
				style={{ paddingTop: 30, paddingBottom: 500 }}
				justify="center"
				spacing={6}
			>
				<Grid item xs={12} style={{ textAlign: "center", paddingBottom: 0 }}>
					<Typography gutterBottom variant="h4" style={{ marginBottom: 0 }}>
						Downloads
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Divider orientation="horizontal" />
				</Grid>

				<Grid item xs={12} sm={5} lg={2}>
					<Grid container justify="space-between" spacing={1}>
						<Grid item xs={12} style={{ textAlign: "center" }}>
							<Typography gutterBottom variant="h5">
								Web Version
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								probando
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
						<Grid item xs={12} style={{ textAlign: "center" }}>
							<Typography gutterBottom variant="h5">
								Desktop
							</Typography>
						</Grid>
						<Grid item xs={6} style={{ textAlign: "center" }}>
							<Button
								variant="contained"
								color="primary"
								className={classes.linuxBtn}
							>
								probando
							</Button>
						</Grid>
						<Grid item xs={6} style={{ textAlign: "center" }}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								probando
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
						<Grid item xs={12} style={{ textAlign: "center" }}>
							<Typography gutterBottom variant="h5">
								Android
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								className={classes.linuxBtn}
							>
								probando
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								probando
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

				<Grid item xs={12} sm={5} lg={3}>
					<Grid container justify="space-between" spacing={1}>
						<Grid item xs={12} style={{ textAlign: "center" }}>
							<Typography gutterBottom variant="h5">
								IOS
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								color="primary"
								className={classes.linuxBtn}
							>
								probando
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button variant="contained" color="primary" className={classes.webBtn}>
								probando
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Divider orientation="horizontal" />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Downloads
