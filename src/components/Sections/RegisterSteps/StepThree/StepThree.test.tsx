import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import StepThree from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<StepThree isRobot={false} testing={true} />
		</Provider>
	)

	const stepThree = getByTestId("test_step_three")

	expect(stepThree).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on verification code input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<StepThree isRobot={false} testing={true} />
			</Provider>
		)

		const code = "123456"

		const codeInput = getByTestId("test_verification_code_input") as HTMLInputElement

		fireEvent.change(codeInput, { target: { value: code } })

		expect(codeInput.value).toBe(code)
	})
})
