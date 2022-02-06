import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import { translate } from "../../../lang"

import DialogComponent from "./index"

describe("the dialog component works properly", () => {
	it("renders properly", () => {
		const { queryByTitle } = render(
			<Provider store={store}>
				<DialogComponent title="testing title" tooltipPlacement="right">
					<p data-testid="test_dialog_content">testing content</p>
				</DialogComponent>
			</Provider>
		)

		const infoBtn = queryByTitle(translate("more_info", "en"))

		expect(infoBtn).toBeTruthy()
	})

	it("opens dialog properly", () => {
		const { queryByTitle, queryByTestId } = render(
			<Provider store={store}>
				<DialogComponent title="testing title" tooltipPlacement="right">
					<p data-testid="test_dialog_content">testing content</p>
				</DialogComponent>
			</Provider>
		)

		const infoBtn = queryByTitle(translate("more_info", "en"))

		infoBtn && fireEvent.click(infoBtn)

		const dialog = queryByTestId("test_dialog")

		expect(dialog).toBeTruthy()

		const dialogTitle = queryByTestId("test_dialog_title")

		expect(dialogTitle?.firstChild?.textContent).toBe("testing title")

		const dialogContent = queryByTestId("test_dialog_content")

		expect(dialogContent?.firstChild?.textContent).toBe("testing content")
	})
})
