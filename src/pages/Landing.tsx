import React, { FC, useState } from "react"

import {
	Container,
	Grid,
	Typography,
	Hidden,
	Divider,
	Fab,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core"

import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

import LandingWelcome from "../components/Sections/LandingWelcome/index"
import Downloads from "../components/Sections/Downloads/index"

const Landing: FC = () => {
	const [open, setOpen] = useState(false)

	const toggleDialog = () => {
		setOpen(!open)
	}

	return (
		<>
			<LandingWelcome />
			<Downloads />
			<Container
				maxWidth="xl"
				style={{ marginTop: "10rem", paddingBottom: "10rem", position: "relative" }}
			>
				<Grid container justify="space-around">
					<Grid item xs={12} style={{ textAlign: "center", marginBottom: "3rem" }}>
						<Typography gutterBottom variant="h4">
							¿Cómo Funciona?
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ marginBottom: "3rem" }}>
						<Divider orientation="horizontal" />
					</Grid>
					<Grid item xs={12} sm={5} style={{ marginBottom: "3rem" }}>
						<Typography variant="body1" style={{ marginBottom: "3rem" }}>
							Todas tus contraseñas estarán completamente protegidas por las mejores
							técnicas de ecriptación, y almacenadas de forma segura en la nube para
							que puedas acceder a ellas en cualquier momento y desde cualquier
							dispositivo.
						</Typography>
						<Typography variant="body1">
							Ya que la principal función de un gestor de contraseñas es,
							precisamente, liberarte de tener que recordar todas tus contraseñas,
							para permitir que solo tú tengas acceso a tus contraseñas nos apoyamos
							en los métodos de autenticación en 2 factores, lo que quiere decir que
							no te identificarás con "algo que sabes" (una contraseña maestra/pin),
							sino que lo harás con "algo que tienes" (el smartphone en tu bolsillo,
							tu email, etc.).
						</Typography>
					</Grid>
					<Hidden xsDown>
						<Divider orientation="vertical" flexItem style={{ marginBottom: "3rem" }} />
					</Hidden>
					<Grid item xs={12} sm={5} style={{ marginBottom: "3rem" }}>
						<Typography variant="body1" style={{ marginBottom: "3rem" }}>
							A la hora de almacenar cualquier información que nos proporciones, esta
							será dividida según sus secciones de "sensibilidad", y las partes más
							sensibles serán almacenadas de manera cifrada, por lo que tus
							contraseñas solo serán visibles cuándo y dónde lo pidas, y nunca más.
						</Typography>
						<Typography variant="body1" paragraph>
							¿Qué es eso de "secciones sensibles"?
						</Typography>
						<Typography variant="body2" paragraph>
							Toda la iformación que ingreses será catalogada y separada. Imaginemos
							que ingresas un email: "
							<Typography component="span" variant="body2" color="primary">
								mr_x@email.com
							</Typography>
							". en este caso la "sección sensible" es aquella que viene antes del
							"@", por lo que esa parte será separada y encriptada, quedando algo así
							"
							<Typography component="span" variant="body2" color="primary">
								m***@email.com
							</Typography>
							".
						</Typography>
						<Typography variant="body2">
							Para ver más información acerca de cómo se encripta y almacena tu
							información puedes hacer click en el botón debajo.
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Grid>
				<Tooltip title="more info" placement="left">
					<Fab
						color="secondary"
						aria-label="help"
						size="small"
						style={{ position: "absolute", bottom: 100, right: 20 }}
						onClick={toggleDialog}
					>
						<HelpOutlineIcon />
					</Fab>
				</Tooltip>
			</Container>

			<Dialog
				onClose={toggleDialog}
				aria-labelledby="simple-dialog-title"
				open={open}
				scroll="paper"
			>
				<DialogTitle id="simple-dialog-title">
					¿Qué es eso de "secciones sensibles"?
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography variant="body2" paragraph>
							Toda la iformación que ingreses será catalogada y separada. Imaginemos
							que ingresas un email: "
							<Typography component="span" variant="body2" color="primary">
								mr_x@email.com
							</Typography>
							". en este caso la "sección sensible" es aquella que viene antes del
							"@", por lo que esa parte será separada y encriptada, quedando algo así
							"
							<Typography component="span" variant="body2" color="primary">
								m***@email.com
							</Typography>
							".
						</Typography>
						<Typography variant="body2" paragraph>
							Lo mismo aplica para las demás categorías de información sensible, a
							continuación tendrás unos ejemplos sobre cómo será mostrada tu
							información una vez encriptada.
						</Typography>
						<Typography variant="body2" paragraph>
							Los asteríscos (*) representan que la información ha sido encriptada, si
							hay sólo 5 asteríscos, significa que no hay nada de esa credencial que
							se almacene sin encriptar.
						</Typography>
						<ol>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									mr_x@email.com
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									m***@email.com
								</Typography>
								",
							</li>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									@Contraseña123
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									*****
								</Typography>
								",
							</li>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									Nombre de Ejemplo
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									N***************o
								</Typography>
								",
							</li>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									Pregunta de Seguridad
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									*****
								</Typography>
								",
							</li>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									Código Único de Seguridad (ejemplo: kj1dn3k32a)
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									*****
								</Typography>
								",
							</li>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									Múltiples Códigos de Seguridad
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									*****
								</Typography>
								",
							</li>
							<li>
								"
								<Typography component="span" variant="body2" color="primary">
									Credenciales de Acceso a Billetera Criptográfica
								</Typography>
								" {"=>"} "
								<Typography component="span" variant="body2" color="primary">
									*****
								</Typography>
								",
							</li>
						</ol>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={toggleDialog} color="default" size="large">
						Volver
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Landing
