import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../redux/store"

import CredentialSQA from "./index"

describe("the credential SQA comp works properly", () => {
	it("renders visible texts properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CredentialSQA locked={true} visible={true} question="question" answer="answer" />
			</Provider>
		)

		const question = getByTestId("test_credential_sqa_question") as HTMLInputElement

		expect(question).toBeTruthy()

		expect(question.value).toBe("question")

		const answer = getByTestId("test_credential_sqa_answer") as HTMLInputElement

		expect(answer).toBeTruthy()

		expect(answer.value).toBe("answer")
	})

	it("renders locked texts", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CredentialSQA locked={true} visible={false} question="question" answer="answer" />
			</Provider>
		)

		const question = getByTestId("test_credential_sqa_question") as HTMLInputElement

		expect(question.value).toBe("••••••••••")

		const answer = getByTestId("test_credential_sqa_answer") as HTMLInputElement

		expect(answer.value).toBe("••••••••••")
	})

	it("edits the text properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CredentialSQA locked={false} visible={true} question="question" answer="answer" />
			</Provider>
		)

		const question = getByTestId("test_credential_sqa_question") as HTMLInputElement

		fireEvent.change(question, { target: { value: "test" } })

		expect(question.value).toBe("test")

		const answer = getByTestId("test_credential_sqa_answer") as HTMLInputElement

		fireEvent.change(answer, { target: { value: "test 2" } })

		expect(answer.value).toBe("test 2")
	})
})
