import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import RecentAccessTable from "./index"

import { recentlySeen4Testing } from "../../../misc/Data4Testing"

it("renders the table properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<RecentAccessTable testing />
		</Provider>
	)

	const table = getByTestId("test_recently_seen_table")

	expect(table).toBeTruthy()
})

it("renders the table's rows properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<RecentAccessTable testing />
		</Provider>
	)

	const row = getByTestId("test_RS_row_" + recentlySeen4Testing[0].id)

	expect(row).toBeTruthy()
})
