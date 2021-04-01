import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import FeedbackForm from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<FeedbackForm />
		</Provider>
	)

	const form = getByTestId("test_feedback_form")

	expect(form).toBeTruthy()
})
