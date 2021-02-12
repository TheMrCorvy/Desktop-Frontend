import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { RouteType } from "../routes"

export default function RoutesComponent(props: { routes: RouteType[] }) {
	// hay que evaluar si está el token de autorizacion en el estado de redux
	const evaluateRoutes = (r: RouteType, i: number) => {
		if (r.requiresAuth) {
			return <Redirect from={r.path} to="/login" key={i} />
		} else {
			return <Route exact path={r.path} component={r.component} key={i} />
		}
	}

	return (
		<Switch>
			{props.routes.map((route: RouteType, index: number) => evaluateRoutes(route, index))}
		</Switch>
	)
}
