import { FC } from "react"
import { BrowserRouter } from "react-router-dom"

/*********************************************************************************** redux related */
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"

/*********************************************************************************** mui related */
import { ThemeProvider } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import useCustomTheme from "./hooks/useCustomTheme"

/*********************************************************************************** layout related components */
import routes from "./misc/routes"
import MapRoutes from "./components/Utils/MapRoutes"
import Layout from "./components/Utils/Layout"

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

	const globalTheme = useCustomTheme(theme)

	const { REACT_APP_ENV_LOCAL } = process.env

	return (
		<ThemeProvider theme={globalTheme}>
			<BrowserRouter>
				<CssBaseline />
				{token && !REACT_APP_ENV_LOCAL && (
					<Beforeunload onBeforeunload={() => translate("before_unload", lng)} />
				)}
				<Layout>
					<MapRoutes routes={routes} />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
