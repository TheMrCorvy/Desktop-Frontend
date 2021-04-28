import React, { FC } from "react"

import { Button, Grid, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		stopPremiumBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

const StopPremium: FC = () => {
	const classes = useStyles()

	return (
		<Grid item xs={12} style={{ marginTop: 25, textAlign: "center" }}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h5">Dejar de ser Premium</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body2">
						Si cancelas tu suscripción premium PasuNashi aún guardará todas tus
						credenciales y contraseñas, con la desventaja de que (una vez finalizado el
						período válido de tu suscripción) ya no podrás ver tus credenciales, pero sí
						podrás exportarlas en todo momento para tenerlas disponibles cuando las
						necesites.
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body2">
						PasuNashi solo te impedirá ver tus credenciales si la cantidad de las mismas
						a tu nombre, supera la cantidad disponible en tu cuenta actualmente. Es
						decir, si compraste 5 espacios, luego fuiste a premium y cargaste 30
						credenciales, al finalizar tu suscripción premium deberás eliminar 20
						credenciales ya que todavía tendrias disponible los 5 espacios extra que
						compraste previamente (más los 5 incluídos en el plan Free).
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						disableElevation
						color="secondary"
						className={classes.stopPremiumBtn}
					>
						DEJAR DE SER PREMIUM
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default StopPremium
