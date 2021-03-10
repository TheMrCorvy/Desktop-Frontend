import React, { FC, useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import Opinions from "../Opinions"

import { OpinionCardT } from "../Opinions/OpinionCard"

import { rating4Testing, suggestion4Testing } from "../../Data4Testing/Opinions"

type FeedbackT = {
	suggestions: OpinionCardT[]
	ratings: OpinionCardT[]
}

const Feedback: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [feedback, setFeedback] = useState<FeedbackT>({
		suggestions: [],
		ratings: [],
	})

	const { REACT_APP_ENV_LOCAL } = process.env

	useEffect(() => {
		if (REACT_APP_ENV_LOCAL) {
			setFeedback({
				suggestions: suggestion4Testing,
				ratings: rating4Testing,
			})
		} else {
			//here will be the api call to fetch the feedback, depending on the current language
		}
	}, [])
	return (
		<div data-testid="test_feedback">
			<Opinions
				title={translate("feedback_titles", lng, 0)}
				opinions={feedback.suggestions}
			/>
			<Opinions title={translate("feedback_titles", lng, 1)} opinions={feedback.ratings} />
		</div>
	)
}

export default Feedback
