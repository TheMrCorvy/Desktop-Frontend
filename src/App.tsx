import React, { FC } from "react"

/*********************************************************************************** redux related */
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"

/*********************************************************************************** mui related */
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"
import { CssBaseline } from "@material-ui/core"

/*********************************************************************************** layout related components */
import routes from "./routes"
import MapRoutes from "./components/MapRoutes"
import Layout from "./components/Layout"

/*********************************************************************************** font awesome */
import { library } from "@fortawesome/fontawesome-svg-core"
import { faKey, faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons"
import { BrowserRouter } from "react-router-dom"
library.add(faKey, faCloudDownloadAlt)

const App: FC = () => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const globalTheme = createMuiTheme({
		palette: {
			type: theme,
			primary: {
				light: "#ff7300",
				dark: "#ff7300",
				main: "#ff7300",
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
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<MapRoutes routes={routes} />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
