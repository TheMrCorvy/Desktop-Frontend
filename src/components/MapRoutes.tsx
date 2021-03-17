import React, { lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { RouteType } from "../misc/routes"

import ScrollTop from "./ScrollTop"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const NotFound = lazy(() => import("../pages/Errors/404"))
const Error500 = lazy(() => import("../pages/Errors/500"))

export default function RoutesComponent(props: { routes: RouteType[] }) {
	const { token } = useSelector((state: RootState) => state.token)

	const { err } = useSelector((state: RootState) => state.err)

	const evaluateRoutes = (r: RouteType, i: number) => {
		if (err !== null) {
			return <Route component={Error500} />
		}

		if (token !== null && r.guestOnly) {
			return <Redirect from={r.path} to="/my-account" key={i} />
		}

		if (r.requiresAuth && token === null) {
			return <Redirect from={r.path} to="/login" key={i} />
		}

		if (r.requiresAuth && token !== null) {
			return <Route exact path={r.path} component={r.component} key={i} />
		}

		return <Route exact path={r.path} component={r.component} key={i} />
	}

	return (
		<>
			<ScrollTop />
			<Switch>
				{props.routes.map((route: RouteType, index: number) =>
					evaluateRoutes(route, index)
				)}
				<Route component={NotFound} />
			</Switch>
		</>
	)
}
