import React, { useState, FC } from "react"

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	TextField,
	Tooltip,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"

import StepThree from "../RegisterSteps/StepThree"

const useStyles = makeStyles({
	borderRadius: {
		borderRadius: 10,
	},
	marginTop: {
		marginTop: "3rem",
	},
})

const AccessManagement: FC = () => {
	const [locked, setLocked] = useState(true)

	const classes = useStyles()

	const toggleLock = () => {
		setLocked(!locked)
	}

	const tooltipTitle = locked ? "edit your account" : "save changes"

	return (
		<Grid item xs={12} md={6} lg={8}>
			<Card className={classes.borderRadius} elevation={2}>
				<CardHeader
					title="access management"
					action={
						<Tooltip title={tooltipTitle} placement="right">
							<IconButton color="primary" onClick={toggleLock}>
								{locked ? <LockIcon /> : <LockOpenIcon />}
							</IconButton>
						</Tooltip>
					}
				/>
				<CardContent>
					<Grid container justify="space-between" spacing={4}>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label="Name"
								name="name"
								type={locked ? "password" : "text"}
								defaultValue="Gonzalo Salvador Corvalán"
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label="Phone"
								name="phoneNumber"
								type={locked ? "password" : "text"}
								defaultValue="+54 011 5048-8031"
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label="Main Email"
								name="mainEmail"
								type={locked ? "password" : "email"}
								defaultValue="mr.corvy@gmail.com"
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								variant="outlined"
								label="Recovery Email"
								name="recoveryEmail"
								type={locked ? "password" : "email"}
								defaultValue="gonzalosalvadorcorvalan@gmail.com"
								disabled={locked}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								label="Anti Fishing Secret"
								name="antiFishing"
								type={locked ? "password" : "text"}
								defaultValue="@Leonard1618"
								disabled={locked}
								fullWidth
							/>
						</Grid>
						{!locked && (
							<Grid item xs={12} className={classes.marginTop}>
								<StepThree isRobot={false} />
							</Grid>
						)}
					</Grid>
				</CardContent>
				{!locked && (
					<CardActions>
						<Button
							variant="contained"
							size="large"
							color="secondary"
							onClick={toggleLock}
							disableElevation
						>
							save changes
						</Button>
					</CardActions>
				)}
			</Card>
		</Grid>
	)
}

export default AccessManagement
