import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import DisplayData from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<DisplayData toggleDisplay={(something: string) => {}} visible={false} />
		</Provider>
	)

	const visibilityBtn = getByTestId("test_visibility_btn")

	expect(visibilityBtn).toBeTruthy()
})

describe("checking if toogles the visibility icon properly", () => {
	it("toggles visibility", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<DisplayData toggleDisplay={(something: string) => {}} visible={false} />
			</Provider>
		)

		const visibilityBtn = getByTestId("test_visibility_btn")

		fireEvent.click(visibilityBtn)

		const isVisible = getByTestId("test_is_visible")

		expect(isVisible).toBeTruthy()
	})
})
