import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import About from "./index"

it("about section renders correctly", () => {
	const { queryByTitle } = render(
		<Provider store={store}>
			<About />
		</Provider>
	)

	const about = queryByTitle("test_about")

	expect(about).toBeTruthy()
})
