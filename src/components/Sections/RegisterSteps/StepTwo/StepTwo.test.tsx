import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import StepTwo from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<StepTwo isRobot={false} testing={true} nextStep={() => {}} />
		</Provider>
	)

	const stepTwo = getByTestId("test_step_two")

	expect(stepTwo).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on verification code input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<StepTwo isRobot={false} testing={true} nextStep={() => {}} />
			</Provider>
		)

		const code = "123456"

		const mainCodeInput = getByTestId("test_main_email_code") as HTMLInputElement
		const recoveryCodeInput = getByTestId("test_main_email_code") as HTMLInputElement

		fireEvent.change(mainCodeInput, { target: { value: code } })

		expect(mainCodeInput.value).toBe(code)

		fireEvent.change(recoveryCodeInput, { target: { value: code } })

		expect(recoveryCodeInput.value).toBe(code)
	})
})
