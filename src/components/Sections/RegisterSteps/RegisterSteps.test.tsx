import { render, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../../redux/store"
import { translate } from "../../../lang"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
library.add(faChevronLeft, faChevronRight)

import RegisterSteps from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<RegisterSteps isRobot={false} />
			</BrowserRouter>
		</Provider>
	)

	const loginOptions = getByTestId("test_register_steps")

	expect(loginOptions).toBeTruthy()
})

// the user is not actually going to be able to go through the steps without completing them
