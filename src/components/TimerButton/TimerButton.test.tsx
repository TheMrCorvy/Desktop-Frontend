import { render, fireEvent } from "@testing-library/react"

import TimerButton from "./index"

it("renders properly", () => {
	const title = "testing timer btn"

	const { getByTestId } = render(<TimerButton title={title} />)

	const timerBtn = getByTestId("test_timer_btn")

	expect(timerBtn).toBeTruthy()

	expect(timerBtn.firstElementChild?.innerHTML).toBe(title)
})

describe("checking if the countdown works properly", () => {
	it("starts the countdown", () => {
		const { getByTestId } = render(<TimerButton title="testing countdown" initialTime={50} />)

		const timerBtn = getByTestId("test_timer_btn")

		fireEvent.click(timerBtn)

		expect(timerBtn.firstElementChild?.innerHTML).toBe("50")

		setTimeout(() => {
			expect(timerBtn.firstElementChild?.innerHTML).toBe("49")
		}, 1000)
	})
})
