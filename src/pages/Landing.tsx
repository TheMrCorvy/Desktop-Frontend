import { Container } from "@material-ui/core"
import React, { FC } from "react"

import LandingWelcome from "../components/Sections/LandingWelcome/index"
import Downloads from "../components/Sections/Downloads/index"

const Landing: FC = () => {
	return (
		<>
			<LandingWelcome />
			<Downloads />
		</>
	)
}

export default Landing
