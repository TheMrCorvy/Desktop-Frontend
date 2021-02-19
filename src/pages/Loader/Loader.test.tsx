import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../redux/store"

import Loader from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<Loader />
			</BrowserRouter>
		</Provider>
	)

	const loader = getByTestId("test_loader_page")

	expect(loader).toBeTruthy()
})
