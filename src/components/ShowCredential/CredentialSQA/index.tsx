import React, { useEffect, useState } from "react"

import {
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	TextField,
	Grid,
} from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import CardFooter from "../CardFooter"

type Props = {
	locked: boolean
	visible: boolean
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

const CredentialSQA = ({ locked, visible, question, answer }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [showQA, setShowQA] = useState({
		q: "",
		a: "",
	})

	useEffect(() => {
		if ((!locked && question && answer) || (visible && question && answer)) {
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
	}, [locked, visible])

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
						{translate("encryption_examples", lng, 10)}
					</Typography>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							label={translate("encryption_examples", lng, 5)}
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
							label={translate("encryption_examples", lng, 6)}
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
			<CardFooter locked={locked} visible={visible} />
		</Accordion>
	)
}

export default CredentialSQA
