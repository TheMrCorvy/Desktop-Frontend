import { render } from "@testing-library/react"

import OpinionCard from "./index"
import { rating4Testing, suggestion4Testing } from "../../misc/Data4Testing"

it("renders properly a suggestion properly", () => {
	const suggestion = suggestion4Testing[0]

	const { getByTestId, getByText } = render(<OpinionCard {...suggestion} />)

	const feedback = getByTestId("test_opinion_card")

	expect(feedback).toBeTruthy()

	const body = getByTestId("test_card_body")

	expect(body.innerHTML).toBe(suggestion.body)

	const fullName = suggestion.user_name

	const userName = getByText(fullName)

	expect(userName.innerHTML).toBe(fullName)
})

it("renders properly a rating properly", () => {
	const rating = rating4Testing[0]

	const { getByTestId, getByText } = render(<OpinionCard {...rating} />)

	const feedback = getByTestId("test_opinion_card")

	expect(feedback).toBeTruthy()

	const body = getByTestId("test_card_body")

	expect(body.innerHTML).toBe(rating.body)

	const fullName = rating.user_name

	const userName = getByText(fullName)

	expect(userName.innerHTML).toBe(fullName)

	const ratingStars = getByTestId("test_opinion_rating")

	expect(ratingStars).toBeTruthy()
})
