import React, { useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { Button, Typography, Paper, MobileStepper } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const tutorialSteps = [
	{
		label: "San Francisco – Oakland Bay Bridge, United States",
		imgPath:
			"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bird",
		imgPath:
			"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bali, Indonesia",
		imgPath:
			"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
	},
]

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: "flex",
			alignItems: "center",
			minHeight: 50,
			textAlign: "center",
			justifyContent: "center",
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			backgroundColor: theme.palette.background.default,
			padding: 20,
		},
		stepperContent: {
			backgroundColor: theme.palette.background.default,
		},
		stepperFooter: {
			backgroundColor: theme.palette.background.default,
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		},
		img: {
			height: 255,
			maxWidth: 400,
			overflow: "hidden",
			display: "block",
			width: "100%",
		},
	})
)

const RegisterSteps = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [activeStep, setActiveStep] = useState(0)

	const maxSteps = tutorialSteps.length

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	return (
		<>
			<Paper square elevation={0} className={classes.header}>
				<Typography>{translate("register_steps_titles", lng, activeStep)}</Typography>
			</Paper>
			<div className={classes.stepperContent}>
				<img
					className={classes.img}
					src={tutorialSteps[activeStep].imgPath}
					alt={tutorialSteps[activeStep].label}
				/>
			</div>
			<MobileStepper
				steps={maxSteps}
				position="static"
				variant="text"
				activeStep={activeStep}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						color="secondary"
						disabled={activeStep === maxSteps - 1}
					>
						<FontAwesomeIcon icon={["fas", "chevron-right"]} size="2x" />
					</Button>
				}
				backButton={
					<Button
						size="small"
						onClick={handleBack}
						color="secondary"
						disabled={activeStep === 0}
					>
						<FontAwesomeIcon icon={["fas", "chevron-left"]} size="2x" />
					</Button>
				}
				className={classes.stepperFooter}
			/>
		</>
	)
}

export default RegisterSteps
