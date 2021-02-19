import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../redux/store"

import NotFound from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<NotFound />
			</BrowserRouter>
		</Provider>
	)

	const notFound = getByTestId("test_not_found_page")

	expect(notFound).toBeTruthy()
})
