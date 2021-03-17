import { lazy, LazyExoticComponent } from "react"

const Landing = lazy(() => import("../pages/Landing"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const DownloadsPage = lazy(() => import("../pages/DownloadsPage"))
const MyCredentials = lazy(() => import("../pages/MyCredentials"))
const MyAccount = lazy(() => import("../pages/MyAccount"))

export type RouteType = {
	component: LazyExoticComponent<any>
	requiresAuth: boolean
	path: string
	guestOnly?: boolean
}

const routes: RouteType[] = [
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
]

export default routes