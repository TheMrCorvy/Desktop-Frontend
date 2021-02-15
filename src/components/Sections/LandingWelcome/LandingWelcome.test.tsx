import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import LandingWelcome from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<LandingWelcome />
		</Provider>
	)

	const welcome = getByTestId("test_landing_welcome")

	expect(welcome).toBeTruthy()
})
