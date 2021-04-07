import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import CredentialCodes from "./index"

describe("the credential code comp shows info properly", () => {
	it("renders crypto access codes properly", () => {
		const { getByTestId, getByText } = render(
			<Provider store={store}>
				<CredentialCodes
					locked={false}
					visible={true}
					label="test title"
					body={["test"]}
					isCrypto
				/>
			</Provider>
		)

		const credentialCodes = getByTestId("test_credential_codes")

		expect(credentialCodes).toBeTruthy()

		const code = getByText("1) test")

		expect(code).toBeTruthy()
	})

	it("renders multiple codes properly", () => {
		const { getByTestId, getByText } = render(
			<Provider store={store}>
				<CredentialCodes
					locked={true}
					visible={false}
					label="test title"
					body={["test"]}
					isCrypto
				/>
			</Provider>
		)

		const credentialCodes = getByTestId("test_credential_codes")

		expect(credentialCodes).toBeTruthy()

		const code = getByText("test")

		expect(code).toBeTruthy()
	})
})
