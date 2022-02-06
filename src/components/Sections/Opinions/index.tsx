import { FC } from "react"

import { Container, Typography, Grid } from "@material-ui/core"

import useStyles from "./styles"

import OpinionCard from "../../UI-Components/OpinionCard"
import { OpinionCardT } from "../../../misc/types"

const Opinions: FC<Props> = ({ title, opinions }) => {
	const classes = useStyles()

	return (
		<div className={classes.root} data-testid="test_opinions_section">
			<Container maxWidth="xl" className={classes.container}>
				<Grid container spacing={3} justify="space-around">
					<Grid item xs={12} className={classes.textCenter}>
						<Typography
							variant="h4"
							gutterBottom
							data-testid="test_opinions_section_title"
						>
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

type Props = {
	title: string
	opinions: OpinionCardT[]
}

export default Opinions
