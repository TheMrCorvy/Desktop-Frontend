import React, { FC } from "react"

import LandingWelcome from "../components/Sections/LandingWelcome"
import Downloads from "../components/Sections/Downloads"
import About from "../components/Sections/About"
import Pricing from "../components/Sections/Pricing"
import Feedback from "../components/Sections/Feedback"

const Landing: FC = () => {
	return (
		<>
			<LandingWelcome />
			<Downloads />
			<About />
			<Feedback />
			<Pricing />
		</>
	)
}

export default Landing
