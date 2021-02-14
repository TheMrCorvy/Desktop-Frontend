import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import LandingWelcome from "./index"

it("welcome section renders properly", () => {
	const { queryByTitle } = render(
		<Provider store={store}>
			<LandingWelcome />
		</Provider>
	)

	const welcome = queryByTitle("test_landing_welcome")

	expect(welcome).toBeTruthy()
})
