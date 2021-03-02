import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import LoginOptions from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<LoginOptions testing={true} />
			</BrowserRouter>
		</Provider>
	)

	const loginOptions = getByTestId("test_login_options")

	expect(loginOptions).toBeTruthy()
})
