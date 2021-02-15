import React, { FC } from "react"

import { Container, Grid, Paper, Typography, Divider } from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import DialogComponent from "../../../components/Dialog"

import PricingCard, { PricingCardT } from "./PricingCard"

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
			paddingBottom: "5rem",
			position: "relative",
		},
		paddingTopL: {
			paddingTop: 50,
		},
		title: {
			paddingTop: 50,
			textAlign: "center",
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
	})
)

const Pricing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()

	const freeCard: PricingCardT = {
		title: translate("tier_free", lng, 0),
		subtitle: translate("tier_free", lng, 1),
		listItems: [
			{
				icon: "sync-alt",
				text: translate("tier_free", lng, 2),
			},
			{
				icon: "lock",
				text: translate("tier_free", lng, 3),
			},
			{
				icon: "fingerprint",
				text: translate("tier_free", lng, 4),
			},
		],
		cardElevation: 0,
		buttonText: translate("navbar_register_btn", lng),
		linkUrl: "/register",
	}

	const semiPremiumCard: PricingCardT = {
		title: translate("tier_semi_premium", lng, 0),
		subtitle: translate("tier_semi_premium", lng, 1),
		listItems: [
			{
				icon: "sync-alt",
				text: translate("tier_semi_premium", lng, 2),
			},
			{
				icon: "lock",
				text: translate("tier_semi_premium", lng, 3),
			},
			{
				icon: "fingerprint",
				text: translate("tier_semi_premium", lng, 5),
			},
			{
				icon: "wallet",
				text: translate("tier_semi_premium", lng, 4),
			},
		],
		cardElevation: 1,
		buttonText: translate("navbar_register_btn", lng),
		linkUrl: "/register",
	}

	const premiumCard: PricingCardT = {
		title: translate("tier_premium", lng, 0),
		subtitle: translate("tier_premium", lng, 1),
		listItems: [
			{
				icon: "sync-alt",
				text: translate("tier_premium", lng, 2),
			},
			{
				icon: "lock-open",
				text: translate("tier_premium", lng, 3),
			},
			{
				icon: "fingerprint",
				text: translate("tier_premium", lng, 6),
			},
			{
				icon: "users",
				text: translate("tier_premium", lng, 4),
			},
			{
				icon: "star",
				text: translate("tier_premium", lng, 5),
			},
		],
		cardElevation: 2,
		buttonText: translate("navbar_register_btn", lng),
		linkUrl: "/register",
	}

	return (
		<Paper
			elevation={0}
			variant="outlined"
			square
			className={classes.paper}
			style={{
				background: theme === "dark" ? "#333" : "#f2f2f2",
			}}
			data-testid="test_pricing_section"
		>
			<Container maxWidth="lg">
				<Grid container justify="space-around" spacing={4} className={classes.paddingTopL}>
					<Grid item xs={12} className={classes.title}>
						<Typography variant="h4" gutterBottom>
							{translate("pricing_title", lng)}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<PricingCard
							title={freeCard.title}
							subtitle={freeCard.subtitle}
							cardElevation={freeCard.cardElevation}
							listItems={freeCard.listItems}
							buttonText={freeCard.buttonText}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<PricingCard
							title={semiPremiumCard.title}
							subtitle={semiPremiumCard.subtitle}
							cardElevation={semiPremiumCard.cardElevation}
							listItems={semiPremiumCard.listItems}
							buttonText={semiPremiumCard.buttonText}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<PricingCard
							title={premiumCard.title}
							subtitle={premiumCard.subtitle}
							cardElevation={premiumCard.cardElevation}
							listItems={premiumCard.listItems}
							buttonText={premiumCard.buttonText}
						/>
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
