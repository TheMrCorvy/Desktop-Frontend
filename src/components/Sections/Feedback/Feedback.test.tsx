import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import Feedback from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Feedback />
		</Provider>
	)

	const feedback = getByTestId("test_feedback")

	expect(feedback).toBeTruthy()
})
