/*************************************************************************** react */
import { ReactElement } from "react"
import { BrowserRouter } from "react-router-dom"

import { render, fireEvent } from "@testing-library/react"

/*************************************************************************** redux related */
import { Provider } from "react-redux"
import store from "../../redux/store"

import Navbar from "./index"

/*************************************************************************** MUI related */
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

/*************************************************************************** import the font awesome icons for the test */
import { library } from "@fortawesome/fontawesome-svg-core"
import { faKey, faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons"
library.add(faKey, faCloudDownloadAlt)

/*************************************************************************** import the translate function for the test */
import { translate } from "../../lang"
import es from "../../lang/es.json"
import en from "../../lang/en.json"
import jp from "../../lang/jp.json"

// first we have to tell the component that it'll be rendered on a specific scale
const SizeWrapper = (props: { children: ReactElement; size: "xs" | "sm" | "md" | "lg" | "xl" }) => {
	const theme = createMuiTheme({
		props: { MuiWithWidth: { initialWidth: props.size } },
	})

	return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}

//now we have to:
// 1) create the global state provider
// 2) wrap everything inside the initial window scale
// 3) since the navbar contains links, we need to put it inside a BrowserRouter
// 4) we can finally attempt to render the navbar, emphasis in "attemp"

describe("large navbar renders and translate function are working properly", () => {
	it("renders properly", () => {
		const { queryByTitle } = render(
			<Provider store={store}>
				<SizeWrapper size="xl">
					<BrowserRouter>
						<Navbar />
					</BrowserRouter>
				</SizeWrapper>
			</Provider>
		)

		const largeNavbar = queryByTitle("test_large_navbar")

		expect(largeNavbar).toBeTruthy()
	})

	it("translates properly", () => {
		const { queryByTitle } = render(
			<Provider store={store}>
				<SizeWrapper size="xl">
					<BrowserRouter>
						<Navbar />
					</BrowserRouter>
				</SizeWrapper>
			</Provider>
		)

		const translateBtn = queryByTitle(translate("translate", "en"))
		// the default lang of the app is en, thats why here the "en" its burned

		expect(translateBtn).toBeTruthy()

		if (translateBtn) {
			fireEvent.click(translateBtn)

			const translateOptionEsp = queryByTitle("test_translation_to_es")
			const translateOptionJpn = queryByTitle("test_translation_to_jp")
			const translateOptionEng = queryByTitle("test_translation_to_en")

			expect(translateOptionEsp).toBeTruthy()
			expect(translateOptionJpn).toBeTruthy()
			expect(translateOptionEng).toBeTruthy()

			const appName = queryByTitle("test_app_name")

			if (translateOptionEsp) {
				// it translates properly to spanish
				fireEvent.click(translateOptionEsp)

				expect(appName?.innerHTML).toBe(es.app_name[0])
			}

			if (translateOptionJpn) {
				// it translates properly to japanes
				fireEvent.click(translateOptionJpn)

				expect(appName?.innerHTML).toBe(jp.app_name[0])
			}

			if (translateOptionEng) {
				// it translates properly back to english
				fireEvent.click(translateOptionEng)

				expect(appName?.innerHTML).toBe(en.app_name[0])
			}
		}
	})
})

it("small navbar renders properly", () => {
	const { queryByTitle } = render(
		<Provider store={store}>
			<SizeWrapper size="xs">
				<BrowserRouter>
					<Navbar />
				</BrowserRouter>
			</SizeWrapper>
		</Provider>
	)

	const smallNavbar = queryByTitle("test_small_navbar")

	expect(smallNavbar).toBeTruthy()
})
