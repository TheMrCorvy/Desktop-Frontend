import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "./redux/store"
import { setLanguage } from "./redux/actions/langActions"
import { translate } from "./lang"
import { light, dark } from "./redux/types"

import Button from "./components/Button"
import Navbar from "./components/Navbar"

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { amber, blue } from "@material-ui/core/colors"
import { CssBaseline, Paper } from "@material-ui/core"
import routes from "./routes"
import MapRoutes from "./components/MapRoutes"

const App: FC = () => {
	const { language } = useSelector((state: RootState) => state.language)

	const { theme } = useSelector((state: RootState) => state.theme)

	const dispatch = useDispatch()

	const chooseLanguage = (value: string) => {
		dispatch(setLanguage(value))
	}

	const globalTheme = createMuiTheme({
		palette: {
			type: theme === "dark" ? "dark" : "light",
			primary: {
				light: amber[500],
				dark: amber[500],
				main: amber[500],
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
			<Paper style={{ minHeight: "100vh", flexGrow: 1 }}>
				<Navbar />
				<MapRoutes routes={routes} />
			</Paper>
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

				<Button text="algun texto de prueba" />
			</div> */}
		</ThemeProvider>
	)
}

export default App
