import React, { FC } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import { ratings, suggestions } from "../../Temporary/Opinions"
import Opinions from "../Opinions"

const Feedback: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	//here will be the api call to fetch the feedback
	return (
		<div data-testid="test_feedback">
			<Opinions title={translate("feedback_titles", lng, 0)} opinions={suggestions} />
			<Opinions title={translate("feedback_titles", lng, 1)} opinions={ratings} />
		</div>
	)
}

export default Feedback
