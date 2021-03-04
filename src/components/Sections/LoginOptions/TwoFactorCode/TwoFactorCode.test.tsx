import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import TwoFactorCode from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<TwoFactorCode isRobot={false} testing={true} />
		</Provider>
	)

	const twoFactorForm = getByTestId("test_2fa_form")

	expect(twoFactorForm).toBeTruthy()
})
