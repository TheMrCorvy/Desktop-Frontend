import React, { FC } from "react"
import { Link } from "react-router-dom"

/******************************************************************************** mui */
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

/******************************************************************************** redux */
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

/******************************************************************************** types & fontawesome */
import { PricingCardT } from "../../misc/types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
		link: {
			textDecoration: "none",
		},
	})
)

const PricingCard: FC<PricingCardT> = ({
	title,
	subtitle,
	cardElevation,
	listItems,
	buttonText,
}) => {
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
				<Link to="/register" className={classes.link}>
					<Button
						color={theme === "dark" ? "secondary" : "primary"}
						variant="contained"
						size="large"
						disableElevation
					>
						{buttonText}
					</Button>
				</Link>
			</CardActions>
		</Card>
	)
}

export default PricingCard
