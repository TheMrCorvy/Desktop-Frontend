import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import DeleteCredential from "./index"

describe("opens dialog properly", () => {
	it("opens dialog properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<DeleteCredential credentialId={2} />
			</Provider>
		)

		const openDeleteDialogBtn = getByTestId("test_open_delete_dialog")

		fireEvent.click(openDeleteDialogBtn)

		const deleteDialog = getByTestId("test_delete_dialog")

		expect(deleteDialog).toBeTruthy()
	})
})
