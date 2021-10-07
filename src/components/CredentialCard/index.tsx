import { FC } from "react"
import { Link } from "react-router-dom"

import { Grid, Card, CardActionArea, Avatar, CardContent, Typography } from "@material-ui/core"

import useStyles from "./styles"

import ControlPointIcon from "@material-ui/icons/ControlPoint"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CredentialT } from "../../misc/types"

import useRandomColor from "./randomColorHook"

type Props = {
	credentials: CredentialT[]
	availableSlots: number
}

const CredentialCard: FC<Props> = ({ credentials, availableSlots }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const randomColor = useRandomColor

	return (
		<>
			{[...Array(availableSlots)].map((value: undefined, index: number) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={index}
					data-testid={"test_available_slot_" + index}
				>
					<Link to="/create-credential" className={classes.link}>
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
					</Link>
				</Grid>
			))}
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
											{credential.company ? (
												<Avatar
													aria-label="recipe"
													src={credential.company.url_logo}
													alt={credential.company.name}
												/>
											) : (
												<Avatar
													aria-label="recipe"
													className={classes.avatar}
													style={{
														backgroundColor: randomColor(),
													}}
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
		</>
	)
}

export default CredentialCard
