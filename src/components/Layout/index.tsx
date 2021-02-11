import React, { ReactElement } from "react"

import { Paper } from "@material-ui/core"
import Navbar from "../Navbar"

const Layout = (props: { children: ReactElement }) => {
	return (
		<Paper style={{ minHeight: "100vh", flexGrow: 1 }}>
			<Navbar />
			{props.children}
		</Paper>
	)
}

export default Layout
