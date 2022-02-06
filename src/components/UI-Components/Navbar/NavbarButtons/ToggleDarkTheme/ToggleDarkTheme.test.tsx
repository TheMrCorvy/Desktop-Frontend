import { fireEvent, render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../../redux/store"

import { translate } from "../../../../../lang"

import ToggleDarkTheme from "./index"

/*********************************************************************************** mui related */
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

it("renders properly", () => {
	const { queryByTitle } = render(
		<Provider store={store}>
			<ToggleDarkTheme />
		</Provider>
	)

	const toggleDarkTheme = queryByTitle(translate("toggle_dark_theme", "en"))

	expect(toggleDarkTheme).toBeTruthy()
})

describe("it toggles between dark and light theme", () => {
	it("toggles the theme properly", () => {
		const globalTheme = createMuiTheme({
			palette: {
				type: "dark",
			},
		})

		const { getByTestId } = render(
			<Provider store={store}>
				<ThemeProvider theme={globalTheme}>
					<ToggleDarkTheme />
				</ThemeProvider>
			</Provider>
		)

		const lightThemeBtn = getByTestId("test_theme_is_dark")

		expect(lightThemeBtn).toBeTruthy()

		fireEvent.click(lightThemeBtn)

		const darkThemeBtn = getByTestId("test_theme_is_light")

		expect(darkThemeBtn).toBeTruthy()

		fireEvent.click(darkThemeBtn)
	})
})
