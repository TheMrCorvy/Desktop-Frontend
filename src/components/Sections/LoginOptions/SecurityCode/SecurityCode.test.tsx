import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import SecurityCode from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<SecurityCode onAuthSuccess={() => {}} endpoint="" isRobot={false} testing={true} />
		</Provider>
	)

	const securityCodeForm = getByTestId("test_security_code_form")

	expect(securityCodeForm).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on the main email input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<SecurityCode onAuthSuccess={() => {}} endpoint="" isRobot={false} testing={true} />
			</Provider>
		)

		const email = "email@email.com"

		const emailInput = getByTestId("test_main_email_input") as HTMLInputElement

		fireEvent.change(emailInput, { target: { value: email } })

		expect(emailInput.value).toBe(email)
	})

	it("writes on the anti-fishing secret input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<SecurityCode onAuthSuccess={() => {}} endpoint="" isRobot={false} testing={true} />
			</Provider>
		)

		const secret = "secret"

		const antiFishingSecretInput = getByTestId("test_anti_fishing_input") as HTMLInputElement

		fireEvent.change(antiFishingSecretInput, { target: { value: secret } })

		expect(antiFishingSecretInput.value).toBe(secret)
	})
})
