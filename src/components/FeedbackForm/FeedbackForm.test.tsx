import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import FeedbackForm from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<FeedbackForm testing />
		</Provider>
	)

	const form = getByTestId("test_feedback_form")

	expect(form).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on the text input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<FeedbackForm testing />
			</Provider>
		)

		const textField = getByTestId("test_text_input") as HTMLInputElement

		fireEvent.change(textField, { target: { value: "lorem" } })

		expect(textField.value).toBe("lorem")
	})

	it("selects the type of feedback", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<FeedbackForm testing />
			</Provider>
		)

		const selectOption = getByTestId("test_select_input")

		fireEvent.change(selectOption, { target: { value: "review" } })
	})
})
