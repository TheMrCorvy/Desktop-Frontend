import React, { FC } from "react"

import {
	Container,
	Paper,
	Typography,
	Button,
	Hidden,
	Card,
	CardContent,
	CardActions,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

const useStyles = makeStyles({
	card: {
		maxWidth: "90%",
		width: "60rem",
		paddingBottom: 20,
		borderRadius: 5,
	},
	cardActions: {
		display: "flex",
		justifyContent: "center",
	},
	paperMain: {
		height: "90vh",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: " center",
		textAlign: "center",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	mainSpacing: {
		marginTop: 50,
	},
	secondarySpacing: {
		marginTop: 10,
	},
})

const LandingWelcome: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	return (
		<Container maxWidth="lg">
			<Paper
				style={{
					background: theme === "dark" ? "#333" : "#f5f5f5",
				}}
				elevation={0}
				square
				className={classes.paperMain}
			>
				<Card className={classes.card}>
					<CardContent>
						<Hidden xsDown>
							<Typography variant="h3" gutterBottom>
								{translate("landing_title", lng)}
							</Typography>
						</Hidden>
						<Hidden smUp>
							<Typography variant="h4" gutterBottom>
								{translate("landing_title", lng)}
							</Typography>
						</Hidden>
						<Typography variant="subtitle1" gutterBottom>
							{translate("landing_main_subtitle", lng)}
						</Typography>
						<Typography
							variant="subtitle2"
							gutterBottom
							className={classes.mainSpacing}
						>
							{translate("landing_second_sub_part_1", lng)}
						</Typography>
						<Typography
							variant="subtitle2"
							gutterBottom
							className={classes.secondarySpacing}
						>
							{translate("landing_second_sub_part_2", lng)}
						</Typography>
						<Typography
							variant="subtitle2"
							gutterBottom
							className={classes.secondarySpacing}
						>
							{translate("landing_second_sub_part_3", lng)}
						</Typography>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<Button
							variant="contained"
							color={theme === "dark" ? "secondary" : "primary"}
							disableElevation
							size="small"
						>
							Continue Reading
						</Button>
					</CardActions>
				</Card>
			</Paper>
		</Container>
	)
}

export default LandingWelcome
