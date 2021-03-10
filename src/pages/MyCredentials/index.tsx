import React, { FC } from "react"
import { Container, Grid } from "@material-ui/core"

const MyCredentials: FC = () => {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={3} justify="space-around">
				<Grid item xs={12} sm={6} md={4}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur aspernatur rem
					et earum excepturi iste aliquam ipsam consequatur odit veniam molestiae
					voluptatibus quae nulla dolore, sunt necessitatibus commodi voluptas maxime!
				</Grid>
			</Grid>
		</Container>
	)
}

export default MyCredentials
