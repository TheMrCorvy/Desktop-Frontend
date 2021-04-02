import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import UnlockData from "./index"

it("renders properly", () => {
	let locked = true

	const { getByTestId } = render(
		<Provider store={store}>
			<UnlockData
				toggleLock={() => {
					locked = !locked
				}}
				locked={locked}
			/>
		</Provider>
	)

	const lockBtn = getByTestId("test_toggle_lock")

	fireEvent.click(lockBtn)

	const dialog = getByTestId("test_dialog")

	expect(dialog).toBeTruthy()

	const btnBack = getByTestId("test_go_back")

	fireEvent.click(btnBack)
})
