import { Container, Grid } from "@material-ui/core"
import React, { FC } from "react"

const MyAccount: FC = () => {
	return (
		<Container maxWidth="xl" style={{ marginTop: "10rem", marginBottom: "10rem" }}>
			<Grid container justify="center">
				<Grid item xs={12} md={6}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint omnis nisi
					corrupti porro delectus? Dicta, mollitia. Eius, amet eveniet fugiat rerum, qui
					exercitationem nam provident officiis temporibus adipisci cum consequatur?
				</Grid>
			</Grid>
		</Container>
	)
}

export default MyAccount
