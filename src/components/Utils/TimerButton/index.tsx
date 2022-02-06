import { FC, useState, useEffect } from "react"
import { Button } from "@material-ui/core"

const TimerButton: FC<Props> = ({ title, initialTime, color, size }) => {
	const [time, setTime] = useState(0)
	const [timerIsOn, setTimerIsOn] = useState(false)

	useEffect(() => {
		if (time === 0) {
			setTimerIsOn(false)
			return
		}

		if (timerIsOn) {
			const timer = setTimeout(() => {
				setTime(time - 1)
			}, 1000)

			return () => {
				clearTimeout(timer)
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
			data-testid="test_timer_btn"
		>
			{time !== 0 ? time : title}
		</Button>
	)
}

type Props = {
	title: string
	initialTime?: number
	color?: "inherit" | "primary" | "secondary" | "default" | undefined
	size?: "small" | "medium" | "large" | undefined
}

export default TimerButton
