import React, { FC, useState, ChangeEvent, useEffect } from "react"
import { Container, Grid, Typography, Select, MenuItem, TextField, Button } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { getUser } from "../../misc/indexedDB"

const FeedbackForm: FC = () => {
	const [feedbackType, setFeedbackType] = useState("sugerencia")

	const [rating, setRating] = useState<number>(0)

	const [allowed, setAllowed] = useState(true)

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

	return !allowed ? null : (
		<Container
			maxWidth="sm"
			style={{ marginTop: "10rem", marginBottom: "5rem", textAlign: "center" }}
		>
			<Grid container justify="center" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h4">Reseñas y Sugerencias</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Select
						value={feedbackType}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					>
						<MenuItem value={"sugerencia"}>sugerencia</MenuItem>
						<MenuItem value={"reseña"}>reseña</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12}>
					<TextField multiline label={"your " + feedbackType} fullWidth rows={6} />
				</Grid>
				<Grid item xs={12}>
					<Grid container justify="space-between" spacing={3}>
						<Grid item style={{ display: "flex", alignItems: "center" }}>
							<Rating
								name="rating"
								value={rating}
								onChange={(event, newRating) => {
									handleRating(newRating)
								}}
								precision={0.5}
							/>
						</Grid>
						<Grid item style={{ display: "flex", alignItems: "center" }}>
							<Button variant="contained" color="primary" disableElevation>
								hola mundo
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default FeedbackForm
