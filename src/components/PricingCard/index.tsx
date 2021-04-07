import React from "react"

import {
	Card,
	CardHeader,
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

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

export type ListItemT = {
	icon: IconName
	text: string
}

export type PricingCardT = {
	title: string
	subtitle: string
	cardElevation: number
	listItems: ListItemT[]
	buttonText: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textCenter: {
			textAlign: "center",
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
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
	})
)

const PricingCard = ({ title, subtitle, cardElevation, listItems, buttonText }: PricingCardT) => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const muiTheme = useTheme()

	const iconColor =
		theme === "dark" ? muiTheme.palette.secondary.main : muiTheme.palette.primary.main

	const classes = useStyles()

	return (
		<Card className={classes.card} elevation={cardElevation} data-testid="test_pricing_card">
			<CardHeader
				title={title}
				className={classes.textCenter}
				subheader={subtitle}
				classes={{
					subheader: classes.textColor,
				}}
			/>
			<CardContent className={classes.paddingBottomSm}>
				<List component="nav" aria-label="accounts benefits">
					{listItems.map((item, index) => (
						<React.Fragment key={index}>
							<ListItem button>
								<ListItemIcon>
									<FontAwesomeIcon
										icon={["fas", item.icon]}
										size="2x"
										color={iconColor}
									/>
								</ListItemIcon>
								<ListItemText>
									<Typography variant="body2">{item.text}</Typography>
								</ListItemText>
							</ListItem>
							<Divider className={classes.divider} />
						</React.Fragment>
					))}
				</List>
			</CardContent>
			<CardActions className={classes.cardAction}>
				<Button
					color={theme === "dark" ? "secondary" : "primary"}
					variant="contained"
					size="large"
					disableElevation
				>
					{buttonText}
				</Button>
			</CardActions>
		</Card>
	)
}

export default PricingCard
