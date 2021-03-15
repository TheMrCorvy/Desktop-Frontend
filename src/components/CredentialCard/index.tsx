import React from "react"

import { Grid, Card, CardActionArea, Avatar, CardContent, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

import MoreVertIcon from "@material-ui/icons/MoreVert"

type Props = {
	credentials: CredentialT[]
	availableSlots: number
}

export type CredentialT = {
	name: string
	avatar: string | null
	recentlySeen: boolean
	id: number
	created_at: string
	updated_at: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			backgroundColor: red[500],
			color: "white",
		},
		card: {
			background: theme.palette.type === "dark" ? theme.palette.background.default : "white",
			height: "100%",
			borderRadius: 8,
		},
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
		lineHeight: {
			lineHeight: 1.5,
			textTransform: "capitalize",
		},
		addCredential: {
			flexGrow: 1,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			minHeight: "100%",
		},
		cardAlter: {
			borderStyle: "dashed",
			background: theme.palette.background.default,
			height: "100%",
			borderRadius: 8,
			minHeight: "7rem",
		},
		cardAction: {
			minHeight: "100%",
		},
	})
)

const CredentialCard = ({ credentials, availableSlots }: Props) => {
	const classes = useStyles()

	return (
		<>
			{credentials.map((credential) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={credential.id}
					data-testid={"test_credential_card_" + credential.id}
				>
					<Card className={classes.card}>
						<CardActionArea className={classes.cardAction}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs={2} className={classes.addCredential}>
										{credential.avatar ? (
											<Avatar
												aria-label="recipe"
												src={credential.avatar}
												alt={credential.name}
											/>
										) : (
											<Avatar aria-label="recipe" className={classes.avatar}>
												{credential.name.charAt(0).toUpperCase()}
											</Avatar>
										)}
									</Grid>
									<Grid item xs={8}>
										<Typography
											variant="subtitle1"
											paragraph
											gutterBottom
											className={classes.lineHeight}
										>
											{credential.name}
										</Typography>
										{credential.recentlySeen && (
											<Typography
												variant="body1"
												className={classes.textColor}
											>
												Has been recently seen
											</Typography>
										)}
									</Grid>
									<Grid item xs={2} className={classes.addCredential}>
										<MoreVertIcon />
									</Grid>
								</Grid>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			))}
			{[...Array(availableSlots)].map((value: undefined, index: number) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={index}
					data-testid={"test_available_slot_" + index}
				>
					<Card className={classes.cardAlter} variant="outlined">
						<CardActionArea className={classes.cardAlter}>
							<CardContent className={classes.addCredential}>
								<MoreVertIcon />
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			))}
		</>
	)
}

export default CredentialCard
