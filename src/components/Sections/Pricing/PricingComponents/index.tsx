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

import { makeStyles } from "@material-ui/core/styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"

import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

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
	linkUrl?: string
}

const useStyles = makeStyles({
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
})

const PricingCard = (props: PricingCardT) => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const muiTheme = useTheme()

	const iconColor =
		theme === "dark" ? muiTheme.palette.secondary.main : muiTheme.palette.primary.main

	const classes = useStyles()

	return (
		<Card
			className={classes.card}
			elevation={props.cardElevation}
			data-testid="test_pricing_card"
		>
			<CardHeader
				title={props.title}
				className={classes.textCenter}
				subheader={props.subtitle}
			/>
			<CardContent className={classes.paddingBottomSm}>
				<List component="nav" aria-label="accounts benefits">
					{props.listItems.map((item, index) => (
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
					{props.buttonText}
				</Button>
			</CardActions>
		</Card>
	)
}

export default PricingCard