import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "./redux/store"
import { setLanguage } from "./redux/actions/langActions"
import { translate } from "./lang"

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { orange, blue } from "@material-ui/core/colors"
import { CssBaseline } from "@material-ui/core"
import routes from "./routes"
import MapRoutes from "./components/MapRoutes"
import Layout from "./components/Layout"

const App: FC = () => {
	const { language } = useSelector((state: RootState) => state.language)

	const { theme } = useSelector((state: RootState) => state.theme)

	const dispatch = useDispatch()

	const chooseLanguage = (value: string) => {
		dispatch(setLanguage(value))
	}

	const globalTheme = createMuiTheme({
		palette: {
			type: theme,
			primary: {
				light: orange[700],
				dark: orange[700],
				main: orange[700],
				contrastText: "#fff",
			},
			secondary: {
				light: blue["A400"],
				dark: blue["A400"],
				main: blue["A400"],
				contrastText: "#fff",
			},
		},
	})

	return (
		<ThemeProvider theme={globalTheme}>
			<CssBaseline />
			<Layout>
				<MapRoutes routes={routes} />
			</Layout>

			{/* <div className="App">
				<header className="App-header">
					<p>{translate("prueba", language)}</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					<button onClick={() => chooseLanguage("en")}>en</button>
					<button onClick={() => chooseLanguage("es")}>es</button>
					<button onClick={() => chooseLanguage("jp")}>jp</button>
				</header>
			</div> */}
		</ThemeProvider>
	)
}

export default App
