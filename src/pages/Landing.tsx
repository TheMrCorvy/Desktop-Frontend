import React, { FC } from "react"

import LandingWelcome from "../components/Sections/LandingWelcome/index"
import Downloads from "../components/Sections/Downloads/index"
import About from "../components/Sections/About"
import Pricing from "../components/Sections/Pricing"

const Landing: FC = () => {
	return (
		<>
			<LandingWelcome />
			<Downloads />
			<About />
			<Pricing />
		</>
	)
}

export default Landing
