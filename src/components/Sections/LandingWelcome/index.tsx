import React, { FC } from "react"
import "../../../styles/styles.css"

import {
	Container,
	Paper,
	Typography,
	Button,
	Hidden,
	Card,
	CardContent,
	CardActions,
	Fab,
} from "@material-ui/core"

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

const useStyles = makeStyles({
	card: {
		maxWidth: "90%",
		width: "60rem",
		paddingBottom: 40,
		paddingTop: 30,
		borderRadius: 5,
	},
	cardActions: {
		display: "flex",
		justifyContent: "center",
	},
	paperMain: {
		height: "85vh",
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
								{translate("prueba", lng, 0)}
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
						<Fab
							color={theme === "dark" ? "secondary" : "primary"}
							className="callToAction"
							size="small"
						>
							<KeyboardArrowDownIcon />
						</Fab>
					</CardActions>
				</Card>
			</Paper>
		</Container>
	)
}

export default LandingWelcome
