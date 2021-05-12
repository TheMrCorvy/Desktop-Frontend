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
