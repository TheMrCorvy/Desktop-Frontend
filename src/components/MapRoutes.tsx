import React, { lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { RouteType } from "../routes"

import ScrollToTop from "./ScrollTop"

const NotFound = lazy(() => import("../pages/NotFound"))

import { useSelector } from "react-redux"

import { RootState } from "../redux/store"

export default function RoutesComponent(props: { routes: RouteType[] }) {
	const { token } = useSelector((state: RootState) => state.token)

	const evaluateRoutes = (r: RouteType, i: number) => {
		if (r.requiresAuth) {
			return token !== null ? (
				<Route exact path={r.path} component={r.component} key={i} />
			) : (
				<Redirect from={r.path} to="/login" key={i} />
			)
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
