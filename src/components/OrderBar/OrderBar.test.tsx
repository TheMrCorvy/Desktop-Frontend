import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import OrderBar from "./index"

describe("the order bar component works properly", () => {
	it("renders properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<OrderBar orderCredentials={() => {}} />
			</Provider>
		)

		const sortBtn = getByTestId("test_order_by_created")

		expect(sortBtn).toBeTruthy()
	})

	it("changes order properly", () => {
		const { getByTestId, queryByTestId } = render(
			<Provider store={store}>
				<OrderBar orderCredentials={() => {}} />
			</Provider>
		)

		const firstBtn = getByTestId("test_order_by_created")
		const secondBtn = getByTestId("test_order_by_edited")

		secondBtn && fireEvent.click(secondBtn)

		const editedArrow = getByTestId("test_edited_arrow")
		expect(editedArrow).toBeTruthy()

		firstBtn && fireEvent.click(firstBtn)

		const createdArrow = getByTestId("test_created_arrow")
		expect(createdArrow).toBeTruthy()
	})
})
