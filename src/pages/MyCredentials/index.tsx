import React, { FC } from "react"

import { Button, Container, Divider, Grid, Paper, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import Downloads from "../../components/Sections/Downloads"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textCenter: {
			textAlign: "center",
		},
		topBar: {
			paddingTop: "6rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
		topDivider: {
			marginBottom: "6rem",
		},
	})
)

const MyCredentials: FC = () => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	return (
		<>
			<Container maxWidth="lg" className={classes.topBar}>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={6} sm={3} className={classes.textCenter}>
						<Button color="inherit" endIcon={<ArrowUpwardIcon />}>
							order by name
						</Button>
					</Grid>
					<Grid item xs={6} sm={3} className={classes.textCenter}>
						<Button color="inherit" endIcon={<ArrowDownwardIcon />}>
							order by created
						</Button>
					</Grid>
					<Grid item xs={6} sm={3} className={classes.textCenter}>
						<Button color="inherit" endIcon={<ArrowDownwardIcon />}>
							order by edited
						</Button>
					</Grid>
					<Grid item xs={12} sm={3} className={classes.textCenter}>
						<Button color="inherit" endIcon={<ArrowDownwardIcon />}>
							recently viewed first
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Divider className={classes.topDivider} />
					</Grid>
				</Grid>
			</Container>
			<Downloads testing />
		</>
	)
}

export default MyCredentials
