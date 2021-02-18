import React from "react"

import { Container, Typography, Grid } from "@material-ui/core"

import { red } from "@material-ui/core/colors"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import OpinionCard, { OpinionCardT } from "./OpinionCard"

type Props = {
	title: string
	opinions: OpinionCardT[]
}

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
			paddingTop: "5rem",
			paddingBottom: "5rem",
		},
		textCenter: {
			textAlign: "center",
		},
		divider: {
			marginBottom: "5rem",
		},
	})
)

const Opinions = ({ title, opinions }: Props) => {
	const classes = useStyles()

	return (
		<div className={classes.root} data-testid="test_opinions_section">
			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={3} justify="space-around">
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h4" gutterBottom>
							{title}
						</Typography>
					</Grid>
					{opinions.map((opinion, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<OpinionCard {...opinion} />
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	)
}

export default Opinions
