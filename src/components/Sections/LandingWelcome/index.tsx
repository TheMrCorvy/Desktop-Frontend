import { FC } from "react"
import "../../../styles/styles.css"

import {
	Container,
	Paper,
	Typography,
	Hidden,
	Card,
	CardContent,
	CardActions,
	Fab,
} from "@material-ui/core"

import useStyles from "./styles"

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

const LandingWelcome: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	const scrollToNextSection = () => {
		const downloadsSection = document.getElementById("downloads-section")

		if (downloadsSection) {
			downloadsSection.scrollIntoView({
				block: "start",
				behavior: "smooth",
			})
		}
	}

	return (
		<Container
			maxWidth="lg"
			className={classes.welcomeSection}
			data-testid="test_landing_welcome"
		>
			<Paper
				style={{
					background: theme === "dark" ? "#333" : "#f2f2f2",
				}}
				elevation={0}
				square
				className={classes.paperMain}
			>
				<Card className={classes.card}>
					<CardContent>
						<Hidden xsDown>
							<Typography variant="h3" gutterBottom>
								{translate("landing_titles", lng, 0)}
							</Typography>
						</Hidden>
						<Hidden smUp>
							<Typography variant="h4" gutterBottom>
								{translate("landing_titles", lng, 0)}
							</Typography>
						</Hidden>
						<Typography variant="subtitle1" gutterBottom>
							{translate("landing_texts", lng, 0)}
						</Typography>
						<Typography
							variant="h5"
							gutterBottom
							paragraph
							className={classes.mainSpacing}
						>
							{translate("landing_titles", lng, 1)}
						</Typography>
						<Typography paragraph gutterBottom variant="body2">
							{translate("landing_texts", lng, 1)}
						</Typography>

						<Typography
							variant="h5"
							gutterBottom
							paragraph
							className={classes.mainSpacing}
						>
							{translate("landing_titles", lng, 2)}
						</Typography>
						<Typography gutterBottom paragraph variant="body2">
							{translate("landing_texts", lng, 2)}
						</Typography>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<Fab
							color={theme === "dark" ? "secondary" : "primary"}
							className="callToAction"
							size="small"
							onClick={scrollToNextSection}
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
