import React, { useState } from "react"

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { MobileStepper, Paper, Typography, Button, Grid } from "@material-ui/core"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { translate } from "../../../lang"

import en from "../../../lang/en.json"

import TwoFactorCode from "../../Sections/LoginOptions/TwoFactorCode"
import EmailCode from "../../Sections/LoginOptions/EmailCode"
import SecurityCode from "../../Sections/LoginOptions/SecurityCode"

type Props = {
	isRobot: boolean
	testing?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			minWidth: "50%",
			[theme.breakpoints.down("xs")]: {
				minWidth: "70%",
			},
		},
		grid: {
			display: "flex",
			justifyContent: "center",
		},
		container: {
			flexGrow: 1,
			[theme.breakpoints.down("xs")]: {
				minHeight: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
			},
		},
		goBack: {
			display: "flex",
			justifyContent: "center",
			marginTop: 15,
		},
	})
)

const Login = ({ testing, isRobot }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	const [activeStep, setActiveStep] = useState(1)

	const [activeOption, setActiveOption] = useState(0)

	const handleNext = (option: number) => {
		setActiveStep(activeStep + 1)

		setActiveOption(option)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const showOptions = (option: number) => {
		switch (option) {
			case 0:
				return <TwoFactorCode isRobot={isRobot} testing={testing} />
			case 1:
				return <EmailCode isRecovery={false} isRobot={isRobot} testing={testing} />
			case 2:
				return <EmailCode isRecovery={true} isRobot={isRobot} testing={testing} />
			case 3:
				return <SecurityCode isRobot={isRobot} testing={testing} />

			default:
				return <TwoFactorCode isRobot={isRobot} testing={testing} />
		}
	}

	return (
		<Grid container justify="center" spacing={2} className={classes.container}>
			{activeStep === 1 &&
				en.login_options.map((option, index) => (
					<Grid item xs={12} key={index} className={classes.grid}>
						<Button
							variant="contained"
							color="secondary"
							disableElevation
							data-testid={"test_login_option_" + index}
							className={classes.btn}
							onClick={() => handleNext(index)}
						>
							{translate("login_options", lng, index)}
						</Button>
					</Grid>
				))}

			{activeStep === 2 && (
				<>
					<Grid item xs={12} className={classes.grid}>
						{showOptions(activeOption)}
					</Grid>
					<Grid item xs={12} className={classes.goBack}>
						<Button color="primary" size="large" onClick={handleBack}>
							{translate("go_back", lng)}
						</Button>
					</Grid>
				</>
			)}
		</Grid>
	)
}

export default Login
