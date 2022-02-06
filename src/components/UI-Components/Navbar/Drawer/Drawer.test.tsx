/*************************************************************************** react imports for the test btn */
import react, { FC } from "react"
import { toggleDrawer } from "../../../../redux/actions/drawerActions"
import { useDispatch } from "react-redux"

import { BrowserRouter } from "react-router-dom"

import Drawer from "./index"

/*************************************************************************** imports for the actual test */
import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

/*************************************************************************** import the font awesome icons for the test */
import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faKey,
	faHome,
	faCloudDownloadAlt,
	faSignInAlt,
	faDoorOpen,
} from "@fortawesome/free-solid-svg-icons"
library.add(faKey, faHome, faCloudDownloadAlt, faSignInAlt, faDoorOpen)

/*************************************************************************** component to open the drawer */
const OpenDrawerForTesting: FC = () => {
	const dispatch = useDispatch()
	return (
		<>
			<BrowserRouter>
				<Provider store={store}>
					<Drawer />
					<button
						onClick={() => dispatch(toggleDrawer(true))}
						data-testid="test_open_drawer"
					>
						open drawer for testing
					</button>
				</Provider>
			</BrowserRouter>
		</>
	)
}

describe("checking if the drawer opens properly", () => {
	it("opens drawer", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<OpenDrawerForTesting />
			</Provider>
		)

		const btn = getByTestId("test_open_drawer")

		btn && fireEvent.click(btn)

		const drawer = getByTestId("test_drawer")

		expect(drawer).toBeTruthy()
	})
})
