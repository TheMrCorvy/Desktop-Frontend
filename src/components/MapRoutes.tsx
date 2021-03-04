import React, { lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { RouteType } from "../routes"

import ScrollToTop from "./ScrollTop"

const NotFound = lazy(() => import("../pages/NotFound"))

export default function RoutesComponent(props: { routes: RouteType[] }) {
	// we have to check if the auth token is on redux
	const evaluateRoutes = (r: RouteType, i: number) => {
		if (r.requiresAuth) {
			return <Redirect from={r.path} to="/login" key={i} />
		} else {
			return <Route exact path={r.path} component={r.component} key={i} />
		}
	}

	return (
		<>
			<ScrollToTop />
			<Switch>
				{props.routes.map((route: RouteType, index: number) =>
					evaluateRoutes(route, index)
				)}

				<Route component={NotFound} />
			</Switch>
		</>
	)
}
