import React, { FC, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { RouteT } from "../misc/types"

import ScrollTop from "./ScrollTop"

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const NotFound = lazy(() => import("../pages/Errors/404"))
const Error500 = lazy(() => import("../pages/Errors/500"))

type Props = { routes: RouteT[] }

/**
 * @alias MapRoutes
 *
 * @description This component will map all the routes imported from {@link Routes}, and enable/disable routes that require auth.
 *
 * @param {RouteT[]} routes The routes imported from {@link Routes}
 *
 * @returns The routes for the app
 */

const RoutesComponent: FC<Props> = (props) => {
	const { token } = useSelector((state: RootState) => state.token)

	const { err } = useSelector((state: RootState) => state.err)

	const evaluateRoutes = (r: RouteT, i: number) => {
		if (err !== null) {
			return <Route component={Error500} key={i} />
		}

		if (token !== null && r.guestOnly) {
			return <Redirect from={r.path} to="/my-account" key={i} />
		}

		if (r.requiresAuth && token === null) {
			return <Redirect from={r.path} to="/login" key={i} />
		}

		if (r.requiresAuth && token !== null) {
			return (
				<Route exact path={r.path} render={(props) => <r.component {...props} />} key={i} />
			)
		}

		return <Route exact path={r.path} render={(props) => <r.component {...props} />} key={i} />
	}

	return (
		<>
			<ScrollTop />
			<Switch>
				{props.routes.map((route: RouteT, index: number) => evaluateRoutes(route, index))}
				<Route component={NotFound} />
			</Switch>
		</>
	)
}

export default RoutesComponent
