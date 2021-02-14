/*************************************************************************** react */
import { ReactElement } from "react"
import { BrowserRouter } from "react-router-dom"

import { render } from "@testing-library/react"

/*************************************************************************** redux related */
import { Provider } from "react-redux"
import store from "../../redux/store"

import Navbar from "./index"

/*************************************************************************** MUI related */
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

/*************************************************************************** import the font awesome icons for the test */
import { library } from "@fortawesome/fontawesome-svg-core"
import { faKey } from "@fortawesome/free-solid-svg-icons"
library.add(faKey)

// first we have to tell the component that it'll be rendered on a specific scale
const SizeWrapper = (props: { children: ReactElement }) => {
	const theme = createMuiTheme({
		props: { MuiWithWidth: { initialWidth: "xl" } },
	})

	return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}

//now we have to:
// 1) create the global state provider
// 2) wrap everything inside the initial window scale
// 3) since the navbar contains links, we need to put it inside a BrowserRouter
// 4) we can finally attempt to render the navbar, emphasis in "attemp"
it("navbar renders correctly", () => {
	const { queryByTitle } = render(
		<Provider store={store}>
			<SizeWrapper>
				<BrowserRouter>
					<Navbar />
				</BrowserRouter>
			</SizeWrapper>
		</Provider>
	)

	const navbar = queryByTitle("test_navbar")

	expect(navbar).toBeTruthy()
})
