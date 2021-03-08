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
						En PasuSewa nos preocupamos por nuestros usuarios, después de todo, la idea
						original detrás del proyecto era el poder facilitarle la vida a las
						personas. Es por eso que decidimos ir un paso más allá, y tratar de enseñar
						un mínimo sobre cómo y porqué proteger mejor la privacidad de nuestros
						usuarios en línea.
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						En esta sección podrás encontrar algunas apps y concejos útiles para
						mantener tu privacidad y seguridad en línea.
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
						tu privacidad en Internet.
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						Pero te estarás preguntando "¿Porqué debería yo cuidar mi privacidad en
						Internet? yo no tengo nada que ocultar...", todos hemos oído o dicho esa
						frase al menos una vez, pero piénsalo de esta forma, ¿no te parecería
						molesto que si un día estuvieras hablando con amigo sobre lo poco que te
						gusta tener que lavar los platos, y al día siguiente te llegaran 30
						panfletos por correo con promociones de lavabajillas?. En Internet pasa lo
						mismo, pero no con panfletos reales, sino en forma de correos de spam,
						anuncios en redes sociales, etc. Vayas a donde vayas, anuncios de
						lavabajillas, en Facebook, en YouTube, en otras redes sociales, y demás.
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
								nuestros dedos, y es ahí en donde entra Firefox Focus. Esta app para
								smartphones te permite hacer búsquedas en Internet sin que queden
								registros de nada, ni Cookies de sitios, ni historial de búsquedas
								en Google, ni sesiones, nada. Todo se limpia automaticamente al
								salir de la app.
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								Navegador Web Tor
							</Typography>
							<Typography variant="body2" paragraph gutterBottom>
								Tor es un navegador muy famoso gracias a que sirve como la entrada
								principal a la dark web, pero no necesariamente es su principal
								objetivo. Fundamentalmente Tor existe para proteger tus búsquedas e
								interacciones en Internet, sí así es, dije "Internet" ya que Tor
								puede usarse para navegar por la web normal, aparte de la dark web.
								Tor elimina del juego a las Cookies, sesiones, posibles ataques que
								puedan intentar hacer las páginas web, etc. Es como si navegaras
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
								opciones y configuraciones que favorecen al Internet libre y
								protegen tu privacidad en el Internet lo convierten en un motor de
								búsquedas ampliamente recomendable.
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
					<Typography variant="body1" paragraph gutterBottom>
						En el apartado de la seguridad, queriamos enfatizar en la importancia de
						activar la Autenticación en 2 Factores, pero... ¿qué es la Autenticación en
						2 Factores?.
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						Existen 3 formas de identificarte, las cuales son: por algo que sabes (una
						contraseña), por algo que eres (tus huellas dactilares, tu rostro, tus
						pupilas, etc.), y por algo que tienes (la llave de tu casa, tu tarjeta de
						crédito, o tu smartphone).
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						Hoy en día las contraseñas no son seguras, existen bases de datos en
						Internet que almacenan patrones compartidos por muchas contraseñas
						hackeadas, y siendo así, si un posible atacante quisiera adivinar tu
						contraseña, lo único que deberá hacer será mezclar esos patrones que se
						repiten frecuentemente hasta dar con la combinación correcta.
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						La Autenticación de 2 Factores lo que hace es aumentar la seguridad
						añadiendo un "factor" o, para explicarlo de una forma más simple, levantar
						un segundo "muro" para proteger tu casa. De esta forma, si alguien adivinara
						tu contraseña, todavía tendría que saltar el segundo muro al tener que
						conseguir también la clave generada por tu smartphone.
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
