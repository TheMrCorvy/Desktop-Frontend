import React, { FC } from "react"
import { Link } from "react-router-dom"

import { Grid, Card, CardActionArea, Avatar, CardContent, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
import ControlPointIcon from "@material-ui/icons/ControlPoint"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CredentialT } from "../../misc/types"

type Props = {
	credentials: CredentialT[]
	availableSlots: number
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
		textPrimary: {
			color: theme.palette.info.main,
		},
		link: {
			textDecoration: "none",
		},
	})
)

const CredentialCard: FC<Props> = ({ credentials, availableSlots }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

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
					<Link to={"/view-credential/" + credential.id} className={classes.link}>
						<Card className={classes.card}>
							<CardActionArea className={classes.cardAction}>
								<CardContent>
									<Grid container spacing={2}>
										<Grid item xs={2} className={classes.addCredential}>
											{credential.logo_url ? (
												<Avatar
													aria-label="recipe"
													src={credential.logo_url}
													alt={credential.company_name}
												/>
											) : (
												<Avatar
													aria-label="recipe"
													className={classes.avatar}
												>
													{credential.company_name
														.charAt(0)
														.toUpperCase()}
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
												{credential.company_name}
											</Typography>
											{credential.recently_seen && (
												<Typography
													variant="body1"
													className={classes.textColor}
												>
													{translate("recently_seen", lng)}
												</Typography>
											)}
										</Grid>
										<Grid item xs={2} className={classes.addCredential}>
											<FontAwesomeIcon
												className={classes.textPrimary}
												icon={["fas", "chevron-right"]}
												size="2x"
											/>
										</Grid>
									</Grid>
								</CardContent>
							</CardActionArea>
						</Card>
					</Link>
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
								<ControlPointIcon
									fontSize="large"
									className={classes.textPrimary}
								/>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			))}
		</>
	)
}

export default CredentialCard
