import { FC, useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { setErrorLoading } from "../../redux/actions/loadingActions"

import { translate } from "../../lang"

import Opinions from "./Opinions"

import { OpinionCardT } from "../../misc/types"

import { rating4Testing, suggestion4Testing } from "../../misc/Data4Testing"
import { callApi } from "../../misc/ajaxManager"
import { ApiCallI } from "../../misc/types"

type FeedbackT = {
	suggestions: OpinionCardT[]
	ratings: OpinionCardT[]
}

const Feedback: FC = () => {
	const dispatch = useDispatch()

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
			const params: ApiCallI = { lng, endpoint: "/feedback/index", method: "GET" }

			callApi(params).then((response) => {
				if (response.status === 200) {
					setFeedback({
						suggestions: response.data.feedback.suggestions,
						ratings: response.data.feedback.ratings,
					})
				} else {
					if (response.message) {
						dispatch(setErrorLoading(response.message))
					} else {
						dispatch(setErrorLoading("Error..."))
					}
				}
			})
		}
	}, [])

	if (feedback.suggestions.length > 0 || feedback.ratings.length > 0) {
		return (
			<div data-testid="test_feedback">
				{feedback.suggestions.length > 0 && (
					<Opinions
						title={translate("feedback_titles", lng, 0)}
						opinions={feedback.suggestions}
					/>
				)}
				{feedback.ratings.length > 0 && (
					<Opinions
						title={translate("feedback_titles", lng, 1)}
						opinions={feedback.ratings}
					/>
				)}
			</div>
		)
	} else {
		return null
	}
}

export default Feedback
