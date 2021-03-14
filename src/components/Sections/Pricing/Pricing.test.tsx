import { render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faSyncAlt,
	faLock,
	faLockOpen,
	faFingerprint,
	faWallet,
	faUsers,
	faStar,
	faFileImport,
} from "@fortawesome/free-solid-svg-icons"
library.add(faSyncAlt, faLock, faLockOpen, faFingerprint, faWallet, faUsers, faStar, faFileImport)

import Pricing from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<Pricing />
		</Provider>
	)

	const pricing = getByTestId("test_pricing_section")

	expect(pricing).toBeTruthy()
})
