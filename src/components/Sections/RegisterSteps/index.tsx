import React, { useState } from "react"
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"

import { Button, Typography, Paper, MobileStepper, Grid } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ReCAPTCHA from "react-google-recaptcha"

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

const RegisterSteps = ({ isRobot, testing }: { isRobot: boolean; testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [isRobot, setIsRobot] = useState(testing ? false : true)

	const [activeStep, setActiveStep] = useState(0)

	const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env

	const theme = useTheme()

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleChangeCaptcha = (captchaResponse: string | null) => {
		if (captchaResponse) {
			setIsRobot(false)
		}
	}

	const handleErrorCaptcha = () => {
		setIsRobot(true)
	}

	const showSteps = () => {
		switch (activeStep) {
			case 0:
				return <StepOne />
			case 1:
				return <StepTwo />
			case 2:
				return <StepThree />

			default:
				return <StepOne />
		}
	}

	return (
		<>
			<Paper square elevation={0} className={classes.header}>
				<Typography>{translate("register_steps_titles", lng, activeStep)}</Typography>
			</Paper>
			<div className={classes.stepperContent}>
				<Grid container justify="space-around" spacing={3}>
					<Grid item xs={12} sm={6}>
						<ReCAPTCHA
							onChange={handleChangeCaptcha}
							sitekey={`${REACT_APP_RECAPTCHA_SITE_KEY}`}
							theme={theme.palette.type}
							onExpired={handleErrorCaptcha}
							onErrored={handleErrorCaptcha}
						/>
					</Grid>
					<Grid item xs={12}>
						{showSteps()}
					</Grid>
				</Grid>
			</div>
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
