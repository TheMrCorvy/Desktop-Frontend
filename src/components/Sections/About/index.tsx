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

import { makeStyles } from "@material-ui/core/styles"

import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import * as es from "../../../lang/es.json"

const useStyles = makeStyles({
	container: {
		marginTop: "10rem",
		paddingBottom: "10rem",
		position: "relative",
	},
	textCenter: {
		textAlign: "center",
	},
	marginB: {
		marginBottom: "3rem",
	},
	infoBtn: {
		position: "absolute",
		bottom: 100,
		right: 20,
	},
})

const About: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [open, setOpen] = useState(false)

	const classes = useStyles()

	const toggleDialog = () => {
		setOpen(!open)
	}

	return (
		<>
			<Container maxWidth="xl" className={classes.container} data-testid="test_about">
				<Grid container justify="space-around">
					<Grid item xs={12} className={(classes.marginB, classes.textCenter)}>
						<Typography gutterBottom variant="h4" className={classes.marginB}>
							{translate("about_title", lng)}
						</Typography>
					</Grid>
					<Grid item xs={12} className={classes.marginB}>
						<Divider orientation="horizontal" />
					</Grid>
					<Grid item xs={12} sm={5} className={classes.marginB}>
						<Typography variant="body1" className={classes.marginB}>
							{translate("about_texts", lng, 0)}
						</Typography>
						<Typography variant="body1">{translate("about_texts", lng, 1)}</Typography>
					</Grid>
					<Hidden xsDown>
						<Divider orientation="vertical" flexItem className={classes.marginB} />
					</Hidden>
					<Grid item xs={12} sm={5} className={classes.marginB}>
						<Typography variant="body1" className={classes.marginB}>
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
								{translate("encrypted_examples", lng, 0)}
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
						className={classes.infoBtn}
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
				scroll="body"
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
						{translate("go_back", lng)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default About
