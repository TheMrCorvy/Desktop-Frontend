import { render } from "@testing-library/react"

import CredentialCard from "./index"

import { credential4Testing, user4Testing } from "../../misc/Data4Testing"

it("renders properly", () => {
	const { getByTestId } = render(
		<CredentialCard
			credentials={credential4Testing}
			availableSlots={user4Testing.availableSlots}
		/>
	)

	const credentialCard = getByTestId("test_credential_card_" + credential4Testing[0].id)

	expect(credentialCard).toBeTruthy()

	const availableSlot = getByTestId("test_available_slot_1")

	expect(availableSlot).toBeTruthy()
})
