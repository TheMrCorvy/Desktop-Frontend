import React, { FC, useState, ChangeEvent, useEffect } from "react"

import { Container, Grid, Typography, Select, MenuItem, TextField, Button } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import { getUser } from "../../misc/indexedDB"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginTop: "10rem",
			marginBottom: "5rem",
			textAlign: "center",
		},
		textLeft: {
			textAlign: "left",
		},
		alignCenter: {
			display: "flex",
			alignItems: "center",
		},
		textDanger: {
			color: theme.palette.error.main,
		},
	})
)

const FeedbackForm: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [feedbackType, setFeedbackType] = useState("suggestion")

	const [rating, setRating] = useState<number>(0)

	const [feedbackBody, setFeedbackBody] = useState("")

	const [allowed, setAllowed] = useState(true)

	const classes = useStyles()

	const maxTxt = 190

	useEffect(() => {
		getUser().then((user: any) => {
			if (user.role !== "premium") {
				setAllowed(false)
			}
		})
	})

	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		setFeedbackType(event.target.value as string)
	}

	const handleRating = (newRating: number | null) => {
		if (newRating !== null) {
			setRating(newRating)
		} else {
			setRating(0)
		}
	}

	const handleChangeTextInput = (event: ChangeEvent<{ value: unknown }>) => {
		setFeedbackBody(event.target.value as string)
	}

	const handleSubmit = () => {
		console.log({
			feedbackType,
			feedbackBody,
			rating: rating * 2,
		})
	}

	return !allowed ? null : (
		<Container maxWidth="sm" className={classes.container}>
			<Grid container justify="center" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h4">{translate("feedback_form", lng, 0)}</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Select
						value={feedbackType}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					>
						<MenuItem value="suggestion">{translate("feedback_form", lng, 4)}</MenuItem>
						<MenuItem value="rating">{translate("feedback_form", lng, 3)}</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} className={classes.textLeft}>
					<TextField
						multiline
						label={translate("feedback_form", lng, 1)}
						fullWidth
						rows={6}
						onChange={handleChangeTextInput}
						value={feedbackBody}
					/>
					<Typography
						variant={feedbackBody.length > maxTxt ? "h4" : "caption"}
						className={feedbackBody.length > maxTxt ? classes.textDanger : ""}
					>
						{feedbackBody.length} / {maxTxt}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container justify="space-between" spacing={3}>
						<Grid item className={classes.alignCenter}>
							{feedbackType === "rating" && (
								<Rating
									name="rating"
									value={rating}
									onChange={(event, newRating) => {
										handleRating(newRating)
									}}
									precision={0.5}
								/>
							)}
						</Grid>
						<Grid item className={classes.alignCenter}>
							<Button
								variant="contained"
								color="primary"
								disableElevation
								onClick={handleSubmit}
							>
								{translate("feedback_form", lng, 2)}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default FeedbackForm
