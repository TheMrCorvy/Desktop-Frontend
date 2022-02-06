import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import EditCredentialCodes from "./index"

describe("opens dialog properly", () => {
	it("opens dialog properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<EditCredentialCodes option={1} codes={["code 1", "code 2"]} isCrypto={true} />
			</Provider>
		)

		const openDialogBtn = getByTestId("test_open_modal")

		fireEvent.click(openDialogBtn)

		const editDialog = getByTestId("test_modal")

		expect(editDialog).toBeTruthy()
	})

	it("renders all text fields properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<EditCredentialCodes option={1} codes={["code 1", "code 2"]} isCrypto={false} />
			</Provider>
		)

		const openDialogBtn = getByTestId("test_open_modal")

		fireEvent.click(openDialogBtn)

		const textField2 = getByTestId("test_1") as HTMLInputElement

		expect(textField2.value).toBe("code 2")
	})
})
