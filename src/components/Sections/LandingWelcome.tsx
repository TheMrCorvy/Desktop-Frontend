import React, { FC } from "react"
import "../../styles/styles.css"

import {
	Container,
	Paper,
	Typography,
	Hidden,
	Card,
	CardContent,
	CardActions,
	Fab,
	Tooltip,
} from "@material-ui/core"

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
			height: "80vh",
			display: "flex",
			justifyContent: "center",
			flexDirection: "column",
			alignItems: " center",
			textAlign: "center",
			borderBottomLeftRadius: 10,
			borderBottomRightRadius: 10,

			[theme.breakpoints.down("xs")]: {
				height: "90vh",
			},
		},
		mainSpacing: {
			marginTop: 50,
		},
		secondarySpacing: {
			marginTop: 10,
		},
		welcomeSection: {
			height: "100vh",
		},
	})
)

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
								{translate("landing_title", lng)}
							</Typography>
						</Hidden>
						<Hidden smUp>
							<Typography variant="h4" gutterBottom>
								{translate("landing_title", lng)}
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
							¿Por qué necesitas un gestor de contraseñas?
						</Typography>
						<Typography paragraph gutterBottom variant="body2">
							El peor enemigo de la productividad es tener que recordar todas tus
							contraseñas.
						</Typography>
						<Typography paragraph gutterBottom variant="body2">
							La memoria humana no es infalible, por lo cual, lo que la mayría de la
							gente suele hacer es usar nombres y fechas fáciles de recordar para así
							no olvidarlas, lo que implica hacer que éstas sean fáciles de deducir.
						</Typography>
						<Typography
							variant="h5"
							gutterBottom
							paragraph
							className={classes.secondarySpacing}
						>
							¿En qué es diferente PasuNashi de los demás servicios que existen en la
							web?
						</Typography>
						<Typography gutterBottom paragraph variant="body2">
							El mundo está dando un giro hacia el abandono de las contraseñas, pero
							aún no es posible abandonarlas completamente. Aquí es donde entra
							PasuNashi, aportando su granito de arena en la batalla por el abandono
							de todas las contraseñas
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
