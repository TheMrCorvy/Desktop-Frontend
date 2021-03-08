import { render, fireEvent, getByTestId } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../../redux/store"
import { translate } from "../../../lang"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
library.add(faChevronLeft, faChevronRight)

import RegisterSteps from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<RegisterSteps isRobot={false} />
			</BrowserRouter>
		</Provider>
	)

	const loginOptions = getByTestId("test_register_steps")

	expect(loginOptions).toBeTruthy()
})

describe("testing if the user can go through the steps", () => {
	it("can go forward and back through the steps", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<BrowserRouter>
					<RegisterSteps isRobot={false} />
				</BrowserRouter>
			</Provider>
		)

		const nextBtn = getByTestId("test_next_step")

		const prevBtn = getByTestId("test_prev_step")

		const stepTitle = getByTestId("test_step_title")

		expect(stepTitle.innerHTML).toBe(translate("register_steps_titles", "en", 0))

		fireEvent.click(nextBtn)

		expect(stepTitle.innerHTML).toBe(translate("register_steps_titles", "en", 1))

		fireEvent.click(nextBtn)

		expect(stepTitle.innerHTML).toBe(translate("register_steps_titles", "en", 2))

		fireEvent.click(prevBtn)
		fireEvent.click(prevBtn)

		expect(stepTitle.innerHTML).toBe(translate("register_steps_titles", "en", 0))
	})
})
