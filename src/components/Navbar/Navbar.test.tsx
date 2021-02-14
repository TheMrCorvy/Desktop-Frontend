import { ReactElement } from "react"
import { BrowserRouter } from "react-router-dom"

import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import Navbar from "./index"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faKey } from "@fortawesome/free-solid-svg-icons"
library.add(faKey)

const SizeWrapper = (props: { children: ReactElement }) => {
	const theme = createMuiTheme({
		props: { MuiWithWidth: { initialWidth: "xs" } },
	})

	return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}

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
