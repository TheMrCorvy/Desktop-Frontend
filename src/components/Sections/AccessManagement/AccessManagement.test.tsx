import { fireEvent, render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import AccessManagement from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<AccessManagement testing />
		</Provider>
	)

	const section = getByTestId("test_access_management")

	expect(section).toBeTruthy()
})

describe("it locks and unlocks info properly", () => {
	it("locks and unlocks", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<AccessManagement testing />
			</Provider>
		)

		const securityLock = getByTestId("test_toggle_lock")

		const nameInput = getByTestId("test_name_input") as HTMLInputElement

		expect(nameInput.getAttribute("type")).toBe("password")

		fireEvent.click(securityLock)

		expect(nameInput.getAttribute("type")).toBe("text")

		fireEvent.click(securityLock)

		expect(nameInput.getAttribute("type")).toBe("password")
	})

	it("writes on the input after unlocking", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<AccessManagement testing />
			</Provider>
		)

		const securityLock = getByTestId("test_toggle_lock")

		const nameInput = getByTestId("test_name_input") as HTMLInputElement

		fireEvent.click(securityLock)

		fireEvent.change(nameInput, { target: { value: "test name" } })

		expect(nameInput.value).toBe("test name")
	})
})
