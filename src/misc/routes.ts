import { lazy } from "react"
import { RouteT } from "./types"

const Landing = lazy(() => import("../pages/Landing"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const DownloadsPage = lazy(() => import("../pages/DownloadsPage"))
const MyCredentials = lazy(() => import("../pages/MyCredentials"))
const MyAccount = lazy(() => import("../pages/MyAccount"))
const ViewCredential = lazy(() => import("../pages/ViewCredential"))
const CreateCredential = lazy(() => import("../pages/CreateCredential"))

/**
 * @alias Routes
 *
 * @description Here are hardcoded all the available routes for the app, with the following properties:
 *
 * @property {React.LazyExoticComponent<any>} component this is the page / view that will be rendered in this route
 *
 * @property {boolean} requiresAuth If the route requires the user to be authenticated or not
 *
 * @property {string} path the url for the route starting with "/"
 *
 * @property {boolean} [guestOnly] if the route can only be seen if the user is not autheticated
 *
 * @returns {RouteT[]} An array all the available routes for the app
 */

const routes: RouteT[] = [
	{
		component: Landing,
		requiresAuth: false,
		path: "/",
	},
	{
		component: Login,
		requiresAuth: false,
		path: "/login",
		guestOnly: true,
	},
	{
		component: Register,
		requiresAuth: false,
		path: "/register",
		guestOnly: true,
	},
	{
		component: DownloadsPage,
		requiresAuth: false,
		path: "/downloads",
	},
	{
		component: MyCredentials,
		requiresAuth: true,
		path: "/my-credentials",
	},
	{
		component: MyAccount,
		requiresAuth: true,
		path: "/my-account",
	},
	{
		component: ViewCredential,
		requiresAuth: true,
		path: "/view-credential/:credentialId",
	},
	{
		component: CreateCredential,
		requiresAuth: true,
		path: "/create-credential",
	},
]

export default routes
