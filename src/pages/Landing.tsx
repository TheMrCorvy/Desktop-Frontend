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

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

import { translate } from "../lang"

import * as es from "../lang/es.json"

const Landing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

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
							{translate("about_title", lng)}
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ marginBottom: "3rem" }}>
						<Divider orientation="horizontal" />
					</Grid>
					<Grid item xs={12} sm={5} style={{ marginBottom: "3rem" }}>
						<Typography variant="body1" style={{ marginBottom: "3rem" }}>
							{translate("about_texts", lng, 0)}
						</Typography>
						<Typography variant="body1">{translate("about_texts", lng, 1)}</Typography>
					</Grid>
					<Hidden xsDown>
						<Divider orientation="vertical" flexItem style={{ marginBottom: "3rem" }} />
					</Hidden>
					<Grid item xs={12} sm={5} style={{ marginBottom: "3rem" }}>
						<Typography variant="body1" style={{ marginBottom: "3rem" }}>
							{translate("about_texts", lng, 2)}
						</Typography>
						<Typography variant="body1" paragraph>
							{translate("about_subtitle", lng)}
						</Typography>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 3)}"
							<Typography component="span" variant="body2" color="primary">
								{translate("encryption_examples", lng, 0)}
							</Typography>
							". {translate("about_texts", lng, 4)}"
							<Typography component="span" variant="body2" color="primary">
								m***@email.com
							</Typography>
							".
						</Typography>
						<Typography variant="body2">{translate("about_texts", lng, 5)}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Grid>
				<Tooltip title={translate("more_info", lng)} placement="left">
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
					{translate("about_subtitle", lng)}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 3)}"
							<Typography component="span" variant="body2" color="primary">
								{translate("encryption_examples", lng, 0)}
							</Typography>
							"{". "}
							{translate("about_texts", lng, 4)}"
							<Typography component="span" variant="body2" color="primary">
								m***@email.com
							</Typography>
							".
						</Typography>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 6)}
						</Typography>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 7)}
						</Typography>
						<ol>
							{es.encryption_examples.map((el, index) => (
								<li key={index}>
									<span>
										"
										<Typography
											component="span"
											variant="body2"
											color="primary"
										>
											{translate("encryption_examples", lng, index)}
										</Typography>
										" {"=>"} "
										<Typography
											component="span"
											variant="body2"
											color="primary"
										>
											{translate("encrypted_examples", lng, index)}
										</Typography>
										",
									</span>
								</li>
							))}
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
