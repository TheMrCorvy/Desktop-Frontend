import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import { credential4Testing } from "../../../misc/Data4Testing"
import store from "../../../redux/store"

import ShowInfo from "./index"

it("renders everything", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<ShowInfo locked={false} visible={true} credential={credential4Testing[2]} />
		</Provider>
	)

	const name = getByTestId("test_credential_name")
	const email = getByTestId("test_credential_email")
	const pass = getByTestId("test_credential_pass")
	const username = getByTestId("test_credential_username")
	const phone = getByTestId("test_credential_phone")
	const uniqueCode = getByTestId("test_credential_unique_code")
	const sqa = getByTestId("test_credential_sqa")
	const multipleCode = getByTestId("test_credential_multiple_code")
	const cryptoAccess = getByTestId("test_credential_crypto_access")

	expect(name).toBeTruthy()
	expect(email).toBeTruthy()
	expect(pass).toBeTruthy()
	expect(username).toBeTruthy()
	expect(phone).toBeTruthy()
	expect(uniqueCode).toBeTruthy()
	expect(sqa).toBeTruthy()
	expect(multipleCode).toBeTruthy()
	expect(cryptoAccess).toBeTruthy()
})
