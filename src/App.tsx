import { FC, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

/*********************************************************************************** redux related */
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./redux/store"

/*********************************************************************************** api for token validation */
import { ApiCallI } from "./misc/types"
import { useApi } from "./hooks/useApi"
import { initiateDB } from "./misc/indexedDB"

/*********************************************************************************** mui related */
import { ThemeProvider } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import useCustomTheme from "./hooks/useCustomTheme"

/*********************************************************************************** layout related components */
import routes from "./misc/routes"
import MapRoutes from "./components/Utils/MapRoutes"
import Layout from "./components/Utils/Layout"

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
import { login } from "./redux/actions/authTokenActions"
import { setErrorLoading, toggleLoading } from "./redux/actions/loadingActions"
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
	const dispatch = useDispatch()
	const callApi = useApi

	const { REACT_APP_ENV_LOCAL } = process.env

	useEffect(() => {
		localStorage.removeItem("recentlySeen")

		const token = localStorage.getItem("token")

		if (token) {
			dispatch(toggleLoading(true))

			const request: ApiCallI = {
				lng,
				endpoint: "/auth/verify-token",
				method: "GET",
				token,
			}

			callApi(request).then(async (response) => {
				if (response.status === 200) {
					await initiateDB(response.data.user_data, response.data.user_credentials)

					dispatch(login(token))

					dispatch(toggleLoading(false))
				} else {
					localStorage.removeItem("token")

					dispatch(setErrorLoading(response.message))
				}
			})
		}
	}, [])

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
