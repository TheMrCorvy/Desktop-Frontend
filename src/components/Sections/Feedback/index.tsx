import React, { FC } from "react"

import { ratings, suggestions } from "../../Temporary/Opinions"
import Opinions from "../Opinions"

const Feedback: FC = () => {
	//here will be the api call to fetch the feedback
	return (
		<>
			<Opinions title="What are we working on?" opinions={suggestions} />
			<Opinions title="What do our users think of PasuSewa?" opinions={ratings} />
		</>
	)
}

export default Feedback
