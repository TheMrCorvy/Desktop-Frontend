import { lazy, LazyExoticComponent } from "react"

const Landing = lazy(() => import("./pages/Landing/index"))

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
]

export default routes
