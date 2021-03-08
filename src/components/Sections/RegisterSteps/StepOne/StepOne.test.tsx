import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import StepOne from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<StepOne isRobot={false} testing={true} nextStep={() => {}} />
		</Provider>
	)

	const stepOne = getByTestId("test_step_one")

	expect(stepOne).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on verification code input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<StepOne isRobot={false} testing={true} nextStep={() => {}} />
			</Provider>
		)

		const name = "gonzalo"
		const phone = "555 1234-5678"

		const nameInput = getByTestId("test_name_input") as HTMLInputElement
		const phoneNumInput = getByTestId("test_phone_num_input") as HTMLInputElement

		fireEvent.change(nameInput, { target: { value: name } })

		expect(nameInput.value).toBe(name)

		fireEvent.change(phoneNumInput, { target: { value: phone } })

		expect(phoneNumInput.value).toBe(phone)
	})
})
