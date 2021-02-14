import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import Downloads from "./index"

it("renders properly", () => {
	const { queryByTitle } = render(
		<Provider store={store}>
			<Downloads />
		</Provider>
	)

	const downloads = queryByTitle("test_downloads")

	expect(downloads).toBeTruthy()
})
