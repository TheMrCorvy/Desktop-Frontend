import React, { useState, useEffect } from "react"
import { Button } from "@material-ui/core"

type Props = {
	title: string
	initialTime?: number
	color?: "inherit" | "primary" | "secondary" | "default" | undefined
	size?: "small" | "medium" | "large" | undefined
}

const TimerButton = ({ title, initialTime, color, size }: Props) => {
	const [time, setTime] = useState(0)

	const [timerIsOn, setTimerIsOn] = useState(false)

	useEffect(() => {
		if (time === 0) {
			setTimerIsOn(false)
		} else {
			if (timerIsOn) {
				const timer = setTimeout(() => {
					setTime(time - 1)
				}, 1000)
				return () => {
					clearTimeout(timer)
				}
			}
		}
	}, [time])

	const startCountDown = () => {
		setTimerIsOn(true)
		setTime(initialTime && initialTime > 0 ? initialTime : 50)
	}

	return (
		<Button
			variant="contained"
			color={color ? color : "primary"}
			size={size ? size : "small"}
			disableElevation
			onClick={startCountDown}
			disabled={timerIsOn}
		>
			{time !== 0 ? time : title}
		</Button>
	)
}

export default TimerButton
