import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../redux/store"

import Login from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		</Provider>
	)

	const login = getByTestId("test_login_page")

	expect(login).toBeTruthy()
})
