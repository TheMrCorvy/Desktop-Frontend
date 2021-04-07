import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronRight, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
library.add(faChevronRight, faPlusCircle)

import { Provider } from "react-redux"
import store from "../../redux/store"

import CredentialCard from "./index"

import { credential4Testing, user4Testing } from "../../misc/Data4Testing"

it("renders properly", () => {
	const { getByTestId } = render(
		<BrowserRouter>
			<Provider store={store}>
				<CredentialCard
					credentials={credential4Testing}
					availableSlots={user4Testing.slots_available}
				/>
			</Provider>
		</BrowserRouter>
	)

	const credentialCard = getByTestId("test_credential_card_" + credential4Testing[0].id)

	expect(credentialCard).toBeTruthy()

	const availableSlot = getByTestId("test_available_slot_1")

	expect(availableSlot).toBeTruthy()
})
