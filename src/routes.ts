import { lazy, LazyExoticComponent } from "react"

const Landing = lazy(() => import("./pages/Landing"))
const Login = lazy(() => import("./pages/Login"))

export type RouteType = {
	name: string
	component: LazyExoticComponent<any>
	requiresAuth: boolean
	path: string
}

const routes: RouteType[] = [
	{
		name: "Landing Page",
		component: Landing,
		requiresAuth: false,
		path: "/",
	},
	{
		name: "Login Page",
		component: Login,
		requiresAuth: false,
		path: "/login",
	},
]

export default routes
