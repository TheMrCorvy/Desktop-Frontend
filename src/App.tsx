import React, { FC } from "react"
import { BrowserRouter } from "react-router-dom"

/*********************************************************************************** redux related */
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"

/*********************************************************************************** mui related */
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"
import { CssBaseline } from "@material-ui/core"

/*********************************************************************************** layout related components */
import routes from "./misc/routes"
import MapRoutes from "./components/MapRoutes"
import Layout from "./components/Layout"

/*********************************************************************************** prevent reload if user is signed in */
import { Beforeunload } from "react-beforeunload"
import { translate } from "./lang"

/*********************************************************************************** font awesome */
import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faKey,
	faCloudDownloadAlt,
	faSyncAlt,
	faLock,
	faLockOpen,
	faFingerprint,
	faWallet,
	faUsers,
	faStar,
	faChevronLeft,
	faChevronRight,
	faHome,
	faSignInAlt,
	faSignOutAlt,
	faDoorOpen,
	faFileImport,
	faPlusCircle,
} from "@fortawesome/free-solid-svg-icons"
library.add(
	faKey,
	faCloudDownloadAlt,
	faSyncAlt,
	faLock,
	faLockOpen,
	faFingerprint,
	faWallet,
	faUsers,
	faStar,
	faChevronLeft,
	faChevronRight,
	faHome,
	faSignInAlt,
	faSignOutAlt,
	faDoorOpen,
	faFileImport,
	faPlusCircle
)

const App: FC = () => {
	const { theme } = useSelector((state: RootState) => state.theme)

	const { token } = useSelector((state: RootState) => state.token)

	const { lng } = useSelector((state: RootState) => state.lng)

	const globalTheme = createMuiTheme({
		palette: {
			type: theme,
			primary: {
				light: "#ff6200",
				dark: "#ff6200",
				main: "#ff6200",
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

	//I'll leave this here untill I make the credential page

	const userAgentInfo = navigator.userAgent

	const variosStrings = userAgentInfo.split("(")

	const stringFinal = variosStrings[1].split(")")

	console.log(stringFinal[0])

	return (
		<ThemeProvider theme={globalTheme}>
			<BrowserRouter>
				<CssBaseline />
				{token && <Beforeunload onBeforeunload={() => translate("before_unload", lng)} />}
				<Layout>
					<MapRoutes routes={routes} />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
