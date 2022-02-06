import { FC, useState } from "react"

import { Button, Grid } from "@material-ui/core"
import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { translate } from "../../../lang"

import en from "../../../lang/en.json"

import ShowOptions from "./ShowOptions"

import { ApiResponseLoginT } from "../../../misc/types"

const LoginOptions: FC<Props> = ({ onAuthSuccess, isRobot, testing, endpointAlt }) => {
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
							disabled={isRobot}
						>
							{translate("login_options", lng, index)}
						</Button>
					</Grid>
				))}

			{activeStep === 2 && (
				<>
					<Grid item xs={12} className={classes.grid}>
						<ShowOptions
							option={activeOption}
							isRobot={isRobot}
							testing={testing}
							onAuthSuccess={onAuthSuccess}
							endpointAlt={endpointAlt}
						/>
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

type Props = {
	onAuthSuccess: (res: ApiResponseLoginT) => void
	isRobot: boolean
	endpointAlt?: boolean
	testing?: boolean
}

export default LoginOptions
