import { FC, useState } from "react"

import { Button, Typography, Paper, MobileStepper } from "@material-ui/core"
import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { login } from "../../../redux/actions/authTokenActions"
import { showError } from "../../../redux/actions/errorHandlingActions"

import { translate } from "../../../lang"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ApiResponseLoginT } from "../../../misc/types"

import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"

import { initiateDB } from "../../../misc/indexedDB"

type Props = { isRobot: boolean }

const RegisterSteps: FC<Props> = ({ isRobot }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const dispatch = useDispatch()

	const classes = useStyles()

	const [activeStep, setActiveStep] = useState(0)

	const [stepResponse, setStepResponse] = useState("")

	const handleNext = (response?: string) => {
		if (response) {
			setStepResponse(response)
		}

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
				return <StepTwo isRobot={isRobot} nextStep={handleNext} email={stepResponse} />
			case 2:
				return (
					<StepThree
						isRobot={isRobot}
						token={stepResponse}
						onAuthSuccess={handleAuthSuccess}
					/>
				)

			default:
				return <StepOne isRobot={isRobot} nextStep={handleNext} />
		}
	}

	const handleAuthSuccess = async (res: ApiResponseLoginT) => {
		const db = await initiateDB(res.user_data, res.user_credentials)

		if (db === undefined) {
			dispatch(showError(translate("error_messages", lng, 6)))
		} else {
			dispatch(login(res.token))
		}
	}

	return (
		<>
			<Paper
				square
				elevation={0}
				className={classes.header}
				data-testid="test_register_steps"
			>
				<Typography data-testid="test_step_title">
					{translate("register_steps_titles", lng, activeStep)}
				</Typography>
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
						data-testid="test_prev_step"
					>
						<FontAwesomeIcon icon={["fas", "chevron-left"]} size="2x" />
					</Button>
				}
				nextButton={
					<Button
						size="small"
						onClick={() => handleNext}
						color="secondary"
						disabled={activeStep === 2 || isRobot}
						data-testid="test_next_step"
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
