import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import CredentialProperties from "./index"

describe("the credential props comp works properly", () => {
	it("renders visible texts properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CredentialProperties
					locked={true}
					visible={true}
					label="test"
					opening="a"
					char_count={4}
					ending="z"
					body="a to z"
				/>
			</Provider>
		)

		const credentialProp = getByTestId("test_credential_prop") as HTMLInputElement

		expect(credentialProp).toBeTruthy()

		expect(credentialProp.value).toBe("a to z")
	})

	it("renders locked texts", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CredentialProperties
					locked={true}
					visible={false}
					label="test"
					opening="a"
					char_count={4}
					ending="z"
					body="a to z"
				/>
			</Provider>
		)

		const credentialProp = getByTestId("test_credential_prop") as HTMLInputElement

		expect(credentialProp.value).toBe("a••••z")
	})

	it("edits the text properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CredentialProperties
					locked={false}
					visible={true}
					label="test"
					opening="a"
					char_count={4}
					ending="z"
					body="a to z"
				/>
			</Provider>
		)

		const credentialProp = getByTestId("test_credential_prop") as HTMLInputElement

		fireEvent.change(credentialProp, { target: { value: "test" } })

		expect(credentialProp.value).toBe("test")
	})
})
