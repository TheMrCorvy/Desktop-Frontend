import { FC } from "react"

import { Container, Grid, Paper, Typography, Divider } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import DialogComponent from "../../UI-Components/Dialog"

import PricingCard from "../../UI-Components/PricingCard"
import { PricingCardT } from "../../../misc/types"

import { pricingInfo } from "../../../misc/staticData"

const Pricing: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { theme } = useSelector((state: RootState) => state.theme)

	const classes = useStyles()
	const info: PricingCardT[] = pricingInfo(lng)

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
					{info.map((infoCard, index) => (
						<Grid item xs={12} sm={6} md={4} key={index}>
							<PricingCard
								title={infoCard.title}
								subtitle={infoCard.subtitle}
								cardElevation={infoCard.cardElevation}
								listItems={infoCard.listItems}
								buttonText={infoCard.buttonText}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
			<DialogComponent
				title={translate("about_prices", lng)}
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
