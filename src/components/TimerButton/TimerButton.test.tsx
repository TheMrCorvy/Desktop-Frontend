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
		const title = "testing countdown"

		const { getByTestId } = render(<TimerButton title={title} initialTime={2} />)

		const timerBtn = getByTestId("test_timer_btn")

		fireEvent.click(timerBtn)

		expect(timerBtn.firstElementChild?.innerHTML).toBe("2")

		setTimeout(() => {
			expect(timerBtn.firstElementChild?.innerHTML).toBe("1")
		}, 1000)

		setTimeout(() => {
			expect(timerBtn.firstElementChild?.innerHTML).toBe(title)
		}, 2000)
	})
})
