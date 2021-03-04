import { lazy, LazyExoticComponent } from "react"

const Landing = lazy(() => import("./pages/Landing"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))

export type RouteType = {
	name: string
	component: LazyExoticComponent<any>
	requiresAuth: boolean
	path: string
	guestOnly?: boolean
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
		guestOnly: true,
	},
	{
		name: "Register Page",
		component: Register,
		requiresAuth: false,
		path: "/register",
		guestOnly: true,
	},
]

export default routes
