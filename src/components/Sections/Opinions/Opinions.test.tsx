import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import Opinions from "./index"
import { ratingsForTesting, suggestionsForTesting } from "../../Temporary/Opinions"

const title = "testing title"

it("renders suggestions properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Opinions title={title} opinions={suggestionsForTesting} />
		</Provider>
	)

	const opinions = getByTestId("test_opinions_section")

	expect(opinions).toBeTruthy()

	const testTitle = getByTestId("test_opinions_section_title")

	expect(testTitle.innerHTML).toBe(title)
})

it("renders ratings properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Opinions title={title} opinions={ratingsForTesting} />
		</Provider>
	)

	const opinions = getByTestId("test_opinions_section")

	expect(opinions).toBeTruthy()

	const testTitle = getByTestId("test_opinions_section_title")

	expect(testTitle.innerHTML).toBe(title)

	const testRatings = getByTestId("test_opinion_rating")

	expect(testRatings).toBeTruthy()
})
