import { render, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import LoginOptions from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<LoginOptions testing={true} />
			</BrowserRouter>
		</Provider>
	)

	const loginOptions = getByTestId("test_login_options")

	expect(loginOptions).toBeTruthy()
})

it("renders all tabs properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<LoginOptions testing={true} />
			</BrowserRouter>
		</Provider>
	)

	const tabOne = getByTestId("test_login_option_0")

	expect(tabOne).toBeTruthy()

	const tabTwo = getByTestId("test_login_option_1")

	expect(tabTwo).toBeTruthy()

	const tabThree = getByTestId("test_login_option_2")

	expect(tabThree).toBeTruthy()

	const tabFour = getByTestId("test_login_option_3")

	expect(tabFour).toBeTruthy()
})

describe("testing the behaviour of the tabs", () => {
	it("toggles between different tabs", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginOptions testing={true} />
				</BrowserRouter>
			</Provider>
		)

		const tabOne = getByTestId("test_login_option_0")
		const tabTwo = getByTestId("test_login_option_1")
		const tabThree = getByTestId("test_login_option_2")
		const tabFour = getByTestId("test_login_option_3")

		fireEvent.click(tabTwo)

		const mainEmailForm = getByTestId("test_main_email_form")

		expect(mainEmailForm).toBeTruthy()
	})
})
