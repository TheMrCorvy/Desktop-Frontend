import React from "react"

import { Container, Divider, Grid, Hidden, Typography } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import Downloads from "../components/Sections/Downloads"

const DownloadsPage = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

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
							{translate("downloads_page_titles", lng, 0)}
						</Typography>
					</Hidden>
					<Hidden smUp>
						<Typography variant="h4" paragraph gutterBottom>
							{translate("downloads_page_titles", lng, 0)}
						</Typography>
					</Hidden>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 0)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 1)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 2)}
					</Typography>
				</Grid>
				<Grid xs={12} sm={8}>
					<Divider style={{ marginBottom: "5rem", marginTop: "5rem" }} />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant="h4" paragraph gutterBottom>
						{translate("downloads_page_titles", lng, 1)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 3)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 4)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 5)}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<ul>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								Firefox Focus
							</Typography>
							<Typography variant="body1" paragraph gutterBottom>
								{translate("recommended_apps_texts", lng, 3)}
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								Navegador Web Tor
							</Typography>
							<Typography variant="body2" paragraph gutterBottom>
								{translate("recommended_apps_texts", lng, 4)}
							</Typography>
						</li>
						<li style={{ marginBottom: 32 }}>
							<Typography variant="h5" paragraph gutterBottom>
								duck duck go
							</Typography>
							<Typography variant="body1" paragraph gutterBottom>
								{translate("recommended_apps_texts", lng, 5)}
							</Typography>
						</li>
					</ul>
				</Grid>
				<Grid xs={12} sm={8}>
					<Divider style={{ marginBottom: "5rem", marginTop: "5rem" }} />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant="h4" paragraph gutterBottom>
						{translate("downloads_page_titles", lng, 2)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 6)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 7)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 8)}
					</Typography>
					<Typography variant="body1" paragraph gutterBottom>
						{translate("downloads_page_texts", lng, 9)}
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
