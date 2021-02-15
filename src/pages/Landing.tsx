import React, { FC } from "react"

import LandingWelcome from "../components/Sections/LandingWelcome/index"
import Downloads from "../components/Sections/Downloads/index"
import About from "../components/Sections/About"

import {
	Card,
	CardHeader,
	Container,
	Grid,
	Paper,
	Typography,
	CardContent,
	List,
	ListItem,
	ListItemIcon,
	Divider,
	ListItemText,
	Button,
	CardActions,
	Fab,
	Tooltip,
} from "@material-ui/core"

import InboxIcon from "@material-ui/icons/Inbox"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import DialogComponent from "../components/Dialog"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		infoBtn: {
			position: "absolute",
			bottom: 30,
			left: 30,
			boxShadow: "none",

			[theme.breakpoints.down("xs")]: {
				bottom: 20,
				left: 20,
			},
		},
		paper: {
			flexGrow: 1,
			minHeight: "20vh",
			marginBottom: "40rem",
			paddingBottom: "5rem",
			position: "relative",
		},
		textCenter: {
			textAlign: "center",
		},
		paddingTopL: {
			paddingTop: 50,
		},
		paddingBottomSm: { paddingBottom: 10 },
		card: {
			borderRadius: 8,
		},
		cardAction: {
			display: "flex",
			justifyContent: "center",
			textAlign: "center",
			paddingBottom: "2.5rem",
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
		title: {
			paddingTop: 50,
			textAlign: "center",
		},
	})
)

const Landing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	return (
		<>
			<LandingWelcome />
			<Downloads />
			<About />
			<Paper
				elevation={0}
				variant="outlined"
				square
				className={classes.paper}
				style={{
					background: theme === "dark" ? "#333" : "#f2f2f2",
				}}
			>
				<Container maxWidth="lg">
					<Grid
						container
						justify="space-around"
						spacing={4}
						className={classes.paddingTopL}
					>
						<Grid item xs={12} className={classes.title}>
							<Typography variant="h4" gutterBottom>
								Pricing
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card className={classes.card} elevation={0}>
								<CardHeader
									title="Free"
									className={classes.textCenter}
									subheader="Completamente Gratis"
								/>
								<CardContent className={classes.paddingBottomSm}>
									<List component="nav" aria-label="free accounts benefits">
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Todas tus contraseñas en todos tus dispositivos
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Un máximo de 5 espacios disponibles para
													almacenar tus datos
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Seguridad garantizada para toda tu información
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
									</List>
								</CardContent>
								<CardActions className={classes.cardAction}>
									<Button
										color={theme === "dark" ? "secondary" : "primary"}
										variant="contained"
										size="large"
										disableElevation
									>
										Registrarse
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card className={classes.card} elevation={1}>
								<CardHeader
									title="Semi-Premium"
									className={classes.textCenter}
									subheader="Único pago de USD $10 por cada 5 espacios que compres"
								/>
								<CardContent className={classes.paddingBottomSm}>
									<List
										component="nav"
										aria-label="semi-premium accounts benefits"
									>
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Todas tus contraseñas en todos tus dispositivos
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Un máximo de 25 espacios disponibles para
													almacenar tus datos
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Un único pago de USD $10 por cada 5 espacios que
													compres
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Seguridad garantizada para toda tu información
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
									</List>
								</CardContent>
								<CardActions className={classes.cardAction}>
									<Button
										color={theme === "dark" ? "secondary" : "primary"}
										variant="contained"
										size="large"
										disableElevation
									>
										Registrarse
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card className={classes.card} elevation={1}>
								<CardHeader
									title="Premium"
									className={classes.textCenter}
									subheader="USD $5 al mes para tener espacios ilimitados y otras ventajas"
								/>
								<CardContent className={classes.paddingBottomSm}>
									<List
										component="nav"
										aria-label="semi-premium accounts benefits"
									>
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Todas tus contraseñas en todos tus dispositivos
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Cantidad de espacios ilimitados por una
													suscripción de USD $5 al mes
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Prioridad para tus sugerencias, con la
													posibilidad de que éstas sean publicadas en los
													medios oficiales
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Posibilidad de que tu reseña sea publicada en
													los medios oficiales
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
										<ListItem button>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText>
												<Typography variant="body2">
													Seguridad garantizada para toda tu información
												</Typography>
											</ListItemText>
										</ListItem>
										<Divider className={classes.divider} />
									</List>
								</CardContent>
								<CardActions className={classes.cardAction}>
									<Button
										color={theme === "dark" ? "secondary" : "primary"}
										variant="contained"
										size="large"
										disableElevation
									>
										Registrarse
									</Button>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Container>
				<DialogComponent
					title="Acerca de los precios"
					className={classes.infoBtn}
					tooltipPlacement="right"
				>
					<>
						<Typography variant="h5" gutterBottom>
							Tier Free
						</Typography>
						<Typography paragraph variant="body2">
							El Tier free te da acceso a todas las funcionalidades de la plataforma,
							con la limitación de que no podrás tener más de 5 espacios a tu nombre,
							y que tanto las sugerencias que envíes, como las reseñas, no tendrán la
							opción de ser publicadas en los medios oficiales de la plataforma
							(página web, app, programa de escritorio, redes sociales).
						</Typography>

						<Divider className={classes.divider} />

						<Typography variant="h5" gutterBottom>
							Tier Semi-Premium
						</Typography>
						<Typography paragraph variant="body2">
							El Tier Semi-Premium te proporciona la posibilidad de poder pagar una
							única vez por la cantidad de espacios que creas necesario (máximo 20
							espacios). Una vez realizado el pago, nunca más tendrás que preocuparte
							por renovarlo a no ser que desees comprar más espacios.
						</Typography>
						<Typography paragraph variant="body2">
							De igual manera que con el Tier Free, con el Semi-`remium no tendrás la
							posibilidad de que tus sugerencias/reseñas sean publicadas en los medios
							oficiales.
						</Typography>

						<Divider className={classes.divider} />

						<Typography variant="h5" gutterBottom>
							Tier Premium
						</Typography>
						<Typography paragraph variant="body2">
							Para acceder y mantener este rol, deberás pagar una suscripción menusal
							de USD $5 al mes. Esto te proporcionará acceso a una cantidad ilimitada
							de espacios para que almacenes tus credenciales, y también a la
							posibilidad de que tus reseñas y/o sugerencias sean publicadas en los
							medios oficiales com "Feedbac de los Usuarios" con tu nombre (el nombre
							que ingreses en la plataforma al registrarte).
						</Typography>

						<Divider className={classes.divider} />

						<Typography variant="h5" gutterBottom>
							¿Qué son los \"Espacios\"?
						</Typography>
						<Typography paragraph variant="body2">
							Imaginemos que quieres almacenar las credenciales de una cuenta de
							Google. Una cuenta de Google puede incluir: Email, Nombre, Número de
							Teléfono, Código de Seguridad, Email de Respaldo, entre otras.
						</Typography>
						<Typography paragraph variant="body2">
							En lugar de tener espacio solo para un Email, una Contraseña, y una
							Descripción, como en otros gestores de contraseñas, Nosotros incluimos
							todas las credenciales mencionadas y más dentro de Un Solo \"Espacio\",
							de esta forma cada cuenta que ingreses consumirá Un Espacio de los que
							tengas disponibles.
						</Typography>
					</>
				</DialogComponent>
			</Paper>
		</>
	)
}

export default Landing
