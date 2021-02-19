import { render } from "@testing-library/react"

import OpinionCard from "./index"
import { ratingsForTesting, suggestionsForTesting } from "../../../Temporary/Opinions"

it("renders properly a suggestion properly", () => {
	const suggestion = suggestionsForTesting[0]

	const { getByTestId, getByText } = render(<OpinionCard {...suggestion} />)

	const feedback = getByTestId("test_opinion_card")

	expect(feedback).toBeTruthy()

	const body = getByTestId("test_card_body")

	expect(body.innerHTML).toBe(suggestion.opinion.body)

	const fullName = suggestion.user.lastName + " " + suggestion.user.firstName

	const userName = getByText(fullName)

	expect(userName.innerHTML).toBe(fullName)
})

it("renders properly a rating properly", () => {
	const rating = ratingsForTesting[0]

	const { getByTestId, getByText } = render(<OpinionCard {...rating} />)

	const feedback = getByTestId("test_opinion_card")

	expect(feedback).toBeTruthy()

	const body = getByTestId("test_card_body")

	expect(body.innerHTML).toBe(rating.opinion.body)

	const fullName = rating.user.lastName + " " + rating.user.firstName

	const userName = getByText(fullName)

	expect(userName.innerHTML).toBe(fullName)

	const ratingStars = getByTestId("test_opinion_rating")

	expect(ratingStars).toBeTruthy()
})