import { lazy, LazyExoticComponent } from "react"

const Landing = lazy(() => import("./pages/Landing"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const DownloadsPage = lazy(() => import("./pages/DownloadsPage"))

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
		guestOnly: true,
	},
]

export default routes
