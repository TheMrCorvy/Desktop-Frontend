import React, { useEffect, useState } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	AccordionActions,
	Button,
	Divider,
	TextField,
	Grid,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

type Props = {
	locked: boolean
	question?: string
	answer?: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		accordion: {
			width: "100%",
			borderRadius: 8,
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		column: {
			flexBasis: "100%",
		},
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const CredentialSQA = ({ locked, question, answer }: Props) => {
	const classes = useStyles()

	const [showQA, setShowQA] = useState({
		q: "",
		a: "",
	})

	useEffect(() => {
		if (!locked && question && answer) {
			setShowQA({
				q: question,
				a: answer,
			})
		} else {
			setShowQA({
				q: "••••••••••",
				a: "••••••••••",
			})
		}
	}, [locked])

	const handleChange = (event: any) => {
		setShowQA({
			...showQA,
			[event.target.name]: event.target.value,
		})
	}

	return (
		<Accordion defaultExpanded style={{ borderRadius: 8 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={classes.column}>
					<Typography className={classes.heading}>
						Security Question and Answer
					</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							label="Security Question"
							variant="outlined"
							disabled={locked}
							value={showQA.q}
							onChange={handleChange}
							name="q"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Security Answer"
							variant="outlined"
							disabled={locked}
							value={showQA.a}
							onChange={handleChange}
							name="a"
							fullWidth
						/>
					</Grid>
				</Grid>
			</AccordionDetails>
			<Divider />
			{!locked && (
				<AccordionActions>
					<Button size="small" className={classes.btn}>
						Remove
					</Button>
				</AccordionActions>
			)}
		</Accordion>
	)
}

export default CredentialSQA
