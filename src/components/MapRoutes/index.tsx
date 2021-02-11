import React from "react"
import { Route, Switch } from "react-router-dom"
import { RouteType } from "../../routes"

type Prop = {
	routes: RouteType[]
}

export default function RoutesComponent(props: Prop) {
	// hay que evaluar si está el token de autorizacion en el estado de redux
	const evaluateRoutes = (r: RouteType, i: number) => {
		if (r.requiresAuth) {
			return <Route exact path={r.path} component={r.component} key={i} />
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
