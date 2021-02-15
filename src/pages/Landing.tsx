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
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

const Landing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	return (
		<>
			<LandingWelcome />
			<Downloads />
			<About />
			<Paper
				elevation={0}
				variant="outlined"
				square
				style={{
					flexGrow: 1,
					background: theme === "dark" ? "#333" : "#f2f2f2",
					minHeight: "20vh",
					marginBottom: "40rem",
					paddingBottom: "5rem",
					position: "relative",
				}}
			>
				<Container maxWidth="lg">
					<Grid container justify="space-around" spacing={4}>
						<Grid item xs={12} style={{ textAlign: "center", paddingTop: 50 }}>
							<Typography variant="h4" gutterBottom>
								Pricing
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card style={{ borderRadius: 8 }} elevation={0}>
								<CardHeader
									title="Free"
									style={{ textAlign: "center" }}
									subheader="Completamente Gratis"
								/>
								<CardContent style={{ paddingBottom: 10 }}>
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
									</List>
								</CardContent>
								<CardActions
									style={{
										display: "flex",
										justifyContent: "center",
										textAlign: "center",
										paddingBottom: "2.5rem",
									}}
								>
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
							<Card style={{ borderRadius: 8 }} elevation={1}>
								<CardHeader
									title="Semi-Premium"
									style={{ textAlign: "center" }}
									subheader="Único pago de USD $10 por cada 5 espacios que compres"
								/>
								<CardContent style={{ paddingBottom: 10 }}>
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
									</List>
								</CardContent>
								<CardActions
									style={{
										display: "flex",
										justifyContent: "center",
										textAlign: "center",
										paddingBottom: "2.5rem",
									}}
								>
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
							<Card style={{ borderRadius: 8 }} elevation={1}>
								<CardHeader
									title="Premium"
									style={{ textAlign: "center" }}
									subheader="USD $5 al mes para tener espacios ilimitados y otras ventajas"
								/>
								<CardContent style={{ paddingBottom: 10 }}>
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
										<Divider style={{ marginTop: 10, marginBottom: 10 }} />
									</List>
								</CardContent>
								<CardActions
									style={{
										display: "flex",
										justifyContent: "center",
										textAlign: "center",
										paddingBottom: "2.5rem",
									}}
								>
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
				<Tooltip title={translate("more_info", lng)} placement="right">
					<Fab
						color="secondary"
						aria-label="help"
						size="small"
						style={{
							position: "absolute",
							bottom: 30, //20
							left: 30, //20
							boxShadow: "none",
						}}
					>
						<HelpOutlineIcon />
					</Fab>
				</Tooltip>
			</Paper>
		</>
	)
}

export default Landing
