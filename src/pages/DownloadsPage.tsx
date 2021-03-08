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
					<Downloads testing />
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
					<Typography variant="body2" paragraph gutterBottom>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit unde
						vero nostrum debitis eligendi obcaecati laborum recusandae voluptatibus id
						quis mollitia similique ab dolor aperiam! Voluptatem sed ad amet. Lorem,
						ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit unde vero
						nostrum debitis eligendi obcaecati laborum recusandae voluptatibus id quis
						mollitia similique ab dolor aperiam! Voluptatem sed ad amet. Lorem, ipsum
						dolor sit amet consectetur adipisicing elit. Nemo, odit unde vero nostrum
						debitis eligendi obcaecati laborum recusandae voluptatibus id quis mollitia
						similique ab dolor aperiam! Voluptatem sed ad amet.
					</Typography>
				</Grid>
				{/* <Grid xs={12}>
					<Divider style={{ marginBottom: "5rem", marginTop: "5rem" }} />
				</Grid> */}
				<Grid item xs={12} sm={8}>
					<Typography variant="h4" paragraph gutterBottom>
						{/* <span style={{ borderBottom: "1px solid" }}>Privacy</span> */}
						Privacy
					</Typography>
					<Typography variant="body2" paragraph gutterBottom>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit unde
						vero nostrum debitis eligendi obcaecati laborum recusandae voluptatibus id
						quis mollitia similique ab dolor aperiam! Voluptatem sed ad amet. Lorem,
						ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit unde vero
						nostrum debitis eligendi obcaecati laborum recusandae voluptatibus id quis
						mollitia similique ab dolor aperiam! Voluptatem sed ad amet. Lorem, ipsum
						dolor sit amet consectetur adipisicing elit. Nemo, odit unde vero nostrum
						debitis eligendi obcaecati laborum recusandae voluptatibus id quis mollitia
						similique ab dolor aperiam! Voluptatem sed ad amet.
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
					</ul>
				</Grid>
				{/* <Grid xs={12}>
					<Divider style={{ marginBottom: "5rem", marginTop: "5rem" }} />
				</Grid> */}
				<Grid item xs={12} sm={8}>
					<Typography variant="h4" paragraph gutterBottom>
						{/* <span style={{ borderBottom: "1px solid" }}>Security</span> */}
						Security
					</Typography>
					<Typography variant="body2" paragraph gutterBottom>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit unde
						vero nostrum debitis eligendi obcaecati laborum recusandae voluptatibus id
						quis mollitia similique ab dolor aperiam! Voluptatem sed ad amet. Lorem,
						ipsum dolor sit amet consectetur adipisicing elit. Nemo, odit unde vero
						nostrum debitis eligendi obcaecati laborum recusandae voluptatibus id quis
						mollitia similique ab dolor aperiam! Voluptatem sed ad amet. Lorem, ipsum
						dolor sit amet consectetur adipisicing elit. Nemo, odit unde vero nostrum
						debitis eligendi obcaecati laborum recusandae voluptatibus id quis mollitia
						similique ab dolor aperiam! Voluptatem sed ad amet.
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
