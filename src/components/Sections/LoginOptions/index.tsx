import React, { useState, ChangeEvent } from "react"

import en from "../../../lang/en.json"

import { Grid, Tab, Tabs } from "@material-ui/core"

import ReCAPTCHA from "react-google-recaptcha"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { translate } from "../../../lang"

import TwoFactorCode from "./TwoFactorCode"
import EmailCode from "./EmailCode"
import SecurityCode from "./SecurityCode"

const LoginOptions = ({ testing }: { testing?: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { theme } = useSelector((state: RootState) => state.theme)

	const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env

	const [tab, setTab] = useState(0)

	//I had to do this because when I'm testing the component, I can't click on the "I'm not a robot"...
	const [isRobot, setIsRobot] = useState(testing ? false : true)

	const handleTabs = (event: ChangeEvent<{}>, newValue: number) => {
		setTab(newValue)
	}

	const showOptions = (option: number) => {
		switch (option) {
			case 0:
				return <TwoFactorCode isRobot={isRobot} />
			case 1:
				return <EmailCode isRecovery={false} isRobot={isRobot} />
			case 2:
				return <EmailCode isRecovery={true} isRobot={isRobot} />
			case 3:
				return <SecurityCode isRobot={isRobot} />

			default:
				return <TwoFactorCode isRobot={isRobot} />
		}
	}

	const handleChangeCaptcha = (captchaResponse: string | null) => {
		if (captchaResponse) {
			setIsRobot(false)
		}
	}

	const handleErrorCaptcha = () => {
		setIsRobot(true)
	}

	return (
		<Grid container spacing={3} justify="center" data-testid="test_login_options">
			<Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
				<Tabs
					value={tab}
					indicatorColor="primary"
					textColor="primary"
					onChange={handleTabs}
					scrollButtons="off"
					variant="scrollable"
				>
					{en.login_options.map((option, index) => (
						<Tab
							key={index}
							label={translate("login_options", lng, index)}
							data-testid={"test_login_option_" + index}
						/>
					))}
				</Tabs>
			</Grid>
			{!testing && (
				<Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
					<ReCAPTCHA
						onChange={handleChangeCaptcha}
						sitekey={`${REACT_APP_RECAPTCHA_SITE_KEY}`}
						theme={theme}
						onExpired={handleErrorCaptcha}
						onErrored={handleErrorCaptcha}
					/>
				</Grid>
			)}
			<Grid item xs={12} style={{ paddingTop: 15 }}>
				{showOptions(tab)}
			</Grid>
		</Grid>
	)
}

export default LoginOptions
