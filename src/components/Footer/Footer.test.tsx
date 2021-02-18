import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import Footer from "./index"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faKey } from "@fortawesome/free-solid-svg-icons"
library.add(faKey)

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Footer />
		</Provider>
	)

	const footer = getByTestId("test_footer")

	expect(footer).toBeTruthy()
})
