import React, { FC, useState } from "react"

import {
	Card,
	CardContent,
	CardHeader,
	Container,
	Grid,
	IconButton,
	TextField,
	Tooltip,
	useTheme,
} from "@material-ui/core"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import StepThree from "../components/Sections/RegisterSteps/StepThree"

const MyAccount: FC = () => {
	const theme = useTheme()

	const [locked, setLocked] = useState(true)

	const toggleLock = () => {
		setLocked(!locked)
	}

	const tooltipTitle = locked ? "edit your account" : "save changes"

	return (
		<Container
			maxWidth="xl"
			style={{
				paddingTop: "7rem",
				paddingBottom: "10rem",
				background: theme.palette.background.default,
			}}
		>
			<Grid container justify="center">
				<Grid item xs={12} md={6} lg={8}>
					<Card
						style={{ borderRadius: 10, paddingRight: 15, paddingLeft: 15 }}
						elevation={2}
					>
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
									<Grid item xs={12} style={{ marginTop: "3rem" }}>
										<StepThree isRobot={false} />
									</Grid>
								)}
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}

export default MyAccount
