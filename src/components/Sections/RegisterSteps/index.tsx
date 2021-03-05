import React, { useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import { Button, Typography, Paper, MobileStepper } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"

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
			padding: 25,
		},
		stepperFooter: {
			backgroundColor: theme.palette.background.default,
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		},
	})
)

const RegisterSteps = ({ isRobot }: { isRobot: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [activeStep, setActiveStep] = useState(0)

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const showSteps = () => {
		switch (activeStep) {
			case 0:
				return <StepOne isRobot={isRobot} nextStep={handleNext} />
			case 1:
				return <StepTwo isRobot={isRobot} nextStep={handleNext} />
			case 2:
				return <StepThree isRobot={isRobot} />

			default:
				return <StepOne isRobot={isRobot} nextStep={handleNext} />
		}
	}

	return (
		<>
			<Paper square elevation={0} className={classes.header}>
				<Typography>{translate("register_steps_titles", lng, activeStep)}</Typography>
			</Paper>
			<div className={classes.stepperContent}>{showSteps()}</div>
			<MobileStepper
				steps={3}
				position="static"
				variant="text"
				activeStep={activeStep}
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
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						color="secondary"
						disabled={activeStep === 2 || isRobot}
					>
						<FontAwesomeIcon icon={["fas", "chevron-right"]} size="2x" />
					</Button>
				}
				className={classes.stepperFooter}
			/>
		</>
	)
}

export default RegisterSteps
