import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import Error500 from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<Error500 />
			</BrowserRouter>
		</Provider>
	)

	const err = getByTestId("test_500_page")

	expect(err).toBeTruthy()
})
