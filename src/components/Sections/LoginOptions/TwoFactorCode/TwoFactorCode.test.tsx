import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import TwoFactorCode from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<TwoFactorCode isRobot={false} testing={true} />
		</Provider>
	)

	const twoFactorForm = getByTestId("test_2fa_form")

	expect(twoFactorForm).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on the email input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<TwoFactorCode isRobot={false} testing={true} />
			</Provider>
		)

		const email = "email@email.com"

		const emailInput = getByTestId("test_email_input")

		fireEvent.change(emailInput, { target: { value: email } })

		expect(emailInput.value).toBe(email)
	})

	it("writes on the 2fa code input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<TwoFactorCode isRobot={false} testing={true} />
			</Provider>
		)

		const code = "123456"

		const codeInput = getByTestId("test_2fa_code_input")

		fireEvent.change(codeInput, { target: { value: code } })

		expect(codeInput.value).toBe(code)
	})
})
