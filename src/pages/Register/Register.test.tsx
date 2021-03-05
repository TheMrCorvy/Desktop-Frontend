import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../redux/store"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
library.add(faChevronLeft, faChevronRight)

import Register from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<Register />
			</BrowserRouter>
		</Provider>
	)

	const register = getByTestId("test_register_page")

	expect(register).toBeTruthy()
})
