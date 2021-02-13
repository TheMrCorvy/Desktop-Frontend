import React, { FC } from "react"

import LandingWelcome from "../components/Sections/LandingWelcome/index"
import Downloads from "../components/Sections/Downloads/index"
import About from "../components/Sections/About"

const Landing: FC = () => {
	return (
		<>
			<LandingWelcome />
			<Downloads />
			<About />
		</>
	)
}

export default Landing
