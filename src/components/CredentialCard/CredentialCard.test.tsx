import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import CredentialCard from "./index"

import { credential4Testing, user4Testing } from "../../misc/Data4Testing"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<CredentialCard
				credentials={credential4Testing}
				availableSlots={user4Testing.availableSlots}
			/>
		</Provider>
	)

	const credentialCard = getByTestId("test_credential_card_" + credential4Testing[0].id)

	expect(credentialCard).toBeTruthy()

	const availableSlot = getByTestId("test_available_slot_1")

	expect(availableSlot).toBeTruthy()
})
