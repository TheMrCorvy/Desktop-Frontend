import { render, fireEvent } from "@testing-library/react"

import Snackbar from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Snackbar
			message="testing..."
			duration={1001}
			open={true}
			verticalPosition="top"
			horizontalPosition="right"
		/>
	)

	const snackbar = getByTestId("test_snackbar")

	expect(snackbar).toBeTruthy()
})
