import React, { useState, useEffect } from "react"
import { Button } from "@material-ui/core"

const TimerButton = () => {
	const [time, setTime] = useState(0)

	const [timerIsOn, setTimerIsOn] = useState(false)

	useEffect(() => {
		if (time === 0) {
			setTimerIsOn(false)

			return
		} else {
			if (timerIsOn) {
				const timer = setTimeout(() => {
					setTime(time - 1)
				}, 1000)
				return () => {
					clearTimeout(timer)
				}
			} else {
				return
			}
		}
	}, [time])

	const startCountDown = () => {
		setTimerIsOn(true)
		setTime(50)
	}

	return (
		<Button
			variant="contained"
			color="primary"
			size="small"
			disableElevation
			onClick={startCountDown}
		>
			{time !== 0 ? time : "enviar email"}
		</Button>
	)
}

export default TimerButton
