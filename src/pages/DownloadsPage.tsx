import React from "react"

import { Container, Divider, Grid, Hidden, Typography } from "@material-ui/core"

import Downloads from "../components/Sections/Downloads"

const DownloadsPage = () => {
	return (
		<Container maxWidth="xl" style={{ paddingBottom: "5rem", paddingTop: "2rem" }}>
			<Grid container justify="center" spacing={3}>
				<Grid
					item
					xs={12}
					style={{
						minHeight: "70vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Downloads testing alternative />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Hidden xsDown>
						<Typography variant="h3" paragraph gutterBottom>
							Other Recommended Downloads
						</Typography>
					</Hidden>
					<Hidden smUp>
						<Typography variant="h4" paragraph gutterBottom>
							Otras Descargas que Recomendamos
						</Typography>
					</Hidden>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant="body1" paragraph gutterBottom>
						En PasuSewa nos preocupamos por nuestros usuarios, despues de todo, la idea
						original detrás del proyecto era el poder facilitarle la vida a las
						personas. Es por eso que decidimos ir un paso más allá, y tratar de enseñar
						un mínimo sobre cómo y porqué proteger mejor la privacidad en linea
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						En esta sección podrás encontrar algunas apps útiles para mantener tu
						privacidad y seguridad en linea.
					</Typography>
				</Grid>
				<Grid xs={12} sm={8}>
					<Divider style={{ marginBottom: "5rem", marginTop: "5rem" }} />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant="h4" paragraph gutterBottom>
						Privacy
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						En terminos de privacidad hay muchas opciones, como usar algún VPN, o un
						navegador que no registre las Cookies, etc. Pero aquí nos vamos a concentrar
						en 3 apps o servicios específicos que te resultarán muy útiles para mantener
						tu privacidad en internet.
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						Pero te estarás preguntando "¿Porqué debería yo cuidar mi privacidad en
						Internet? yo no tengo nada que ocultar...", todos hemos oído o dicho esa
						frase al menos una vez, pero piénsalo de esta forma, ¿no te parecería
						molesto que si un día estuvieras hablando con amigo sobre lo poco que te
						gusta tener que lavar los platos, y al día siguiente te llegaran 30
						panfletos con promociones de lavabajillas?. En internet pasa lo mismo, pero
						no con panfletos reales, sino en forma de correos de spam, anuncios en redes
						sociales, etc. Vayas a donde vayas, anuncios de lavabajillas, en Facebook,
						en YouTube, en otras redes sociales, y demás.
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						Es por eso que queremos ayudarte a evitar que eso pase, a nadie le gusta
						tener que ver anuncios de lavabajillas las 24 horas del día...
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<ul>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								Firefox Focus
							</Typography>
							<Typography variant="body1" paragraph gutterBottom>
								La gran mayoría de las búsquedas en Internet se hacen desde el
								smartphone, no es un secreto que los tenemos prácticamente pegados a
								nuestros dedos, y es ahí en donde entra Firefox Focus. Esta app te
								permite hacer búsquedas en internet sin que queden registros de
								nada, ni cookies de sitios, ni historial de búsquedas en Google,
								nada. Todo se limpia automaticamente al salir de la app.
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								Navegador Tor
							</Typography>
							<Typography variant="body2" paragraph gutterBottom>
								Tor es un navegador muy famoso gracias a que sirve como entrada
								principal a la dark web, pero ese no siempre fue su principal
								objetivo. Fundamentalmente Tor existe para proteger tus búsquedas e
								interacciones en internet, sí así es, dije "internet" ya que Tor
								puede usarse para navegar por el internet normal, aparte de la dark
								web. Tor elimina del juego a las cookies, sesiones, posibles ataques
								que puedan intentar hacer las páginas web, etc. Es como si navegaras
								desde dentro de un antivirus.
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								duck duck go
							</Typography>
							<Typography variant="body1" paragraph gutterBottom>
								A diferencia de las app que vinimos recomendando, Duck Duck Go no es
								una app, sino más bien un motor de búsquedas, que diferencia de
								Google y otros motores, no ofrece como primeros resultados a
								aquellos sitios que pagaron por publicidad, o que buscaste
								previamente (el llamado "filtro burbuja"), esto de la mano con otras
								opciones y configuraciones que favorecen al internet libre y
								protegen tu privacidad en el internet.
							</Typography>
						</li>
					</ul>
				</Grid>
				<Grid xs={12} sm={8}>
					<Divider style={{ marginBottom: "5rem", marginTop: "5rem" }} />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant="h4" paragraph gutterBottom>
						Security
					</Typography>
					<Typography variant="body2" paragraph gutterBottom>
						En el apartado de la seguridad, queriamos enfatizar en la importancia de
						activar la Autenticación en 2 Factores
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<ul>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								App 1
							</Typography>
							<Typography variant="body2" paragraph gutterBottom>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit
								unde vero nostrum debitis eligendi obcaecati laborum recusandae
								voluptatibus id quis mollitia similique ab dolor aperiam! Voluptatem
								sed ad amet. Lorem, ipsum dolor sit amet consectetur adipisicing
								elit. Nemo, odit unde vero nostrum debitis eligendi obcaecati
								laborum recusandae voluptatibus id quis mollitia similique ab dolor
								aperiam! Voluptatem sed ad amet. Lorem, ipsum dolor sit amet
								consectetur adipisicing elit. Nemo, odit unde vero nostrum debitis
								eligendi obcaecati laborum recusandae voluptatibus id quis mollitia
								similique ab dolor aperiam! Voluptatem sed ad amet.
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								App 2
							</Typography>
							<Typography variant="body2" paragraph gutterBottom>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit
								unde vero nostrum debitis eligendi obcaecati laborum recusandae
								voluptatibus id quis mollitia similique ab dolor aperiam! Voluptatem
								sed ad amet. Lorem, ipsum dolor sit amet consectetur adipisicing
								elit. Nemo, odit unde vero nostrum debitis eligendi obcaecati
								laborum recusandae voluptatibus id quis mollitia similique ab dolor
								aperiam! Voluptatem sed ad amet. Lorem, ipsum dolor sit amet
								consectetur adipisicing elit. Nemo, odit unde vero nostrum debitis
								eligendi obcaecati laborum recusandae voluptatibus id quis mollitia
								similique ab dolor aperiam! Voluptatem sed ad amet.
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								App 3
							</Typography>
							<Typography variant="body2" paragraph gutterBottom>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit
								unde vero nostrum debitis eligendi obcaecati laborum recusandae
								voluptatibus id quis mollitia similique ab dolor aperiam! Voluptatem
								sed ad amet. Lorem, ipsum dolor sit amet consectetur adipisicing
								elit. Nemo, odit unde vero nostrum debitis eligendi obcaecati
								laborum recusandae voluptatibus id quis mollitia similique ab dolor
								aperiam! Voluptatem sed ad amet. Lorem, ipsum dolor sit amet
								consectetur adipisicing elit. Nemo, odit unde vero nostrum debitis
								eligendi obcaecati laborum recusandae voluptatibus id quis mollitia
								similique ab dolor aperiam! Voluptatem sed ad amet.
							</Typography>
						</li>
					</ul>
				</Grid>
			</Grid>
		</Container>
	)
}

export default DownloadsPage
