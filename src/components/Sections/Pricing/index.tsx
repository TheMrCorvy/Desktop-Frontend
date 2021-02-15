import React, { FC } from "react"

import {
	Card,
	CardHeader,
	Container,
	Grid,
	Paper,
	Typography,
	CardContent,
	List,
	ListItem,
	ListItemIcon,
	Divider,
	ListItemText,
	Button,
	CardActions,
} from "@material-ui/core"

import { useTheme } from "@material-ui/core/styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import DialogComponent from "../../../components/Dialog"
import { constants } from "zlib"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		infoBtn: {
			position: "absolute",
			bottom: 30,
			left: 30,
			boxShadow: "none",

			[theme.breakpoints.down("xs")]: {
				bottom: 20,
				left: 20,
			},
		},
		paper: {
			flexGrow: 1,
			minHeight: "20vh",
			marginBottom: "40rem",
			paddingBottom: "5rem",
			position: "relative",
		},
		textCenter: {
			textAlign: "center",
		},
		paddingTopL: {
			paddingTop: 50,
		},
		paddingBottomSm: { paddingBottom: 10 },
		card: {
			borderRadius: 8,
		},
		cardAction: {
			display: "flex",
			justifyContent: "center",
			textAlign: "center",
			paddingBottom: "2.5rem",
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
		title: {
			paddingTop: 50,
			textAlign: "center",
		},
		iconsColor: {
			color: "",
		},
	})
)

const Pricing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	const muiTheme = useTheme()

	const iconsColor =
		theme === "dark" ? muiTheme.palette.secondary.main : muiTheme.palette.primary.main

	return (
		<Paper
			elevation={0}
			variant="outlined"
			square
			className={classes.paper}
			style={{
				background: theme === "dark" ? "#333" : "#f2f2f2",
			}}
		>
			<Container maxWidth="lg">
				<Grid container justify="space-around" spacing={4} className={classes.paddingTopL}>
					<Grid item xs={12} className={classes.title}>
						<Typography variant="h4" gutterBottom>
							{translate("pricing_title", lng)}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card} elevation={0}>
							<CardHeader
								title={translate("tier_free", lng, 0)}
								className={classes.textCenter}
								subheader={translate("tier_free", lng, 1)}
							/>
							<CardContent className={classes.paddingBottomSm}>
								<List component="nav" aria-label="free accounts benefits">
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "sync-alt"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_free", lng, 2)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "lock"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_free", lng, 3)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "fingerprint"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_free", lng, 4)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
								</List>
							</CardContent>
							<CardActions className={classes.cardAction}>
								<Button
									color={theme === "dark" ? "secondary" : "primary"}
									variant="contained"
									size="large"
									disableElevation
								>
									{translate("navbar_register_btn", lng)}
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card} elevation={1}>
							<CardHeader
								title={translate("tier_semi_premium", lng, 0)}
								className={classes.textCenter}
								subheader={translate("tier_semi_premium", lng, 1)}
							/>
							<CardContent className={classes.paddingBottomSm}>
								<List component="nav" aria-label="semi-premium accounts benefits">
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "sync-alt"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_semi_premium", lng, 2)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "lock"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_semi_premium", lng, 3)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "wallet"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_semi_premium", lng, 4)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "fingerprint"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_semi_premium", lng, 5)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
								</List>
							</CardContent>
							<CardActions className={classes.cardAction}>
								<Button
									color={theme === "dark" ? "secondary" : "primary"}
									variant="contained"
									size="large"
									disableElevation
								>
									{translate("navbar_register_btn", lng)}
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card className={classes.card} elevation={1}>
							<CardHeader
								title={translate("tier_premium", lng, 0)}
								className={classes.textCenter}
								subheader={translate("tier_premium", lng, 1)}
							/>
							<CardContent className={classes.paddingBottomSm}>
								<List component="nav" aria-label="semi-premium accounts benefits">
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "sync-alt"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_premium", lng, 2)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "lock-open"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_premium", lng, 3)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "users"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_premium", lng, 4)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "star"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_premium", lng, 5)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
									<ListItem button>
										<ListItemIcon>
											<FontAwesomeIcon
												icon={["fas", "fingerprint"]}
												size="2x"
												color={iconsColor}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">
												{translate("tier_premium", lng, 6)}
											</Typography>
										</ListItemText>
									</ListItem>
									<Divider className={classes.divider} />
								</List>
							</CardContent>
							<CardActions className={classes.cardAction}>
								<Button
									color={theme === "dark" ? "secondary" : "primary"}
									variant="contained"
									size="large"
									disableElevation
								>
									{translate("navbar_register_btn", lng)}
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
			<DialogComponent
				title="Acerca de los precios"
				className={classes.infoBtn}
				tooltipPlacement="right"
			>
				<>
					<Typography variant="h5" gutterBottom>
						{translate("tier_free", lng, 0)}
					</Typography>
					<Typography paragraph variant="body2">
						{translate("tier_free", lng, 5)}
					</Typography>

					<Divider className={classes.divider} />

					<Typography variant="h5" gutterBottom>
						{translate("tier_semi_premium", lng, 0)}
					</Typography>
					<Typography paragraph variant="body2">
						{translate("tier_semi_premium", lng, 6)}
					</Typography>
					<Typography paragraph variant="body2">
						{translate("tier_semi_premium", lng, 7)}
					</Typography>

					<Divider className={classes.divider} />

					<Typography variant="h5" gutterBottom>
						{translate("tier_premium", lng, 0)}
					</Typography>
					<Typography paragraph variant="body2">
						{translate("tier_premium", lng, 7)}
					</Typography>

					<Divider className={classes.divider} />

					<Typography variant="h5" gutterBottom>
						{translate("about_slots", lng, 0)}
					</Typography>
					<Typography paragraph variant="body2">
						{translate("about_slots", lng, 1)}
					</Typography>
					<Typography paragraph variant="body2">
						{translate("about_slots", lng, 2)}
					</Typography>
				</>
			</DialogComponent>
		</Paper>
	)
}

export default Pricing
