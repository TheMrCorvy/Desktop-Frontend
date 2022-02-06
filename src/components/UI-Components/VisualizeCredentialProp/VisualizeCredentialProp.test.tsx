import React, { FC, useEffect } from "react"

import { fireEvent, getByTestId, render } from "@testing-library/react"

import { Provider, useDispatch } from "react-redux"
import store from "../../../redux/store"
import { clearCredential, initializeCredential } from "../../../redux/actions/credentialActions"

import { credential4Testing } from "../../../misc/Data4Testing"

import VisualizeCredentialProp from "./index"

const ComponentForTesting: FC = (props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(clearCredential())

		dispatch(initializeCredential(credential4Testing[0]))
	}, [])

	return <div>{props.children}</div>
}

describe("testing the render options & the writing function", () => {
	it("renders all options for layouts", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<ComponentForTesting>
					<>
						<VisualizeCredentialProp
							label="test text field"
							locked={true}
							visible={false}
							propName="email"
						/>

						<VisualizeCredentialProp
							label="testing sqa"
							locked={false}
							visible={false}
							propName="security_question"
						/>

						<VisualizeCredentialProp
							label="testing multiple codes / crypto codes"
							locked={true}
							visible={false}
							propName="crypto_codes"
						/>
					</>
				</ComponentForTesting>
			</Provider>
		)

		const simpleTextField = getByTestId("test_text_field")
		expect(simpleTextField).toBeTruthy()

		const securityQuestion = getByTestId("test_security_question")
		expect(securityQuestion).toBeTruthy()

		const securityAnswer = getByTestId("test_security_answer")
		expect(securityAnswer).toBeTruthy()

		const multipleCodes = getByTestId("test_codes")
		expect(multipleCodes).toBeTruthy()
	})

	it("renders differently if locked / unlocked", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<ComponentForTesting>
					<>
						<VisualizeCredentialProp
							label="test text field"
							locked={true}
							visible={false}
							propName="description"
						/>

						<VisualizeCredentialProp
							label="test text field"
							locked={false}
							visible={true}
							propName="description"
						/>

						<VisualizeCredentialProp
							label="testing multiple codes / crypto codes"
							locked={false}
							visible={true}
							propName="crypto_codes"
						/>
					</>
				</ComponentForTesting>
			</Provider>
		)

		const lockedDesc = getByTestId("test_description")
		expect(lockedDesc).toBeTruthy()

		const unlockedDesc = getByTestId("test_text_field")
		expect(unlockedDesc).toBeTruthy()

		const unlockedCodes = getByTestId("test_unlocked_codes")
		expect(unlockedCodes).toBeTruthy()
	})

	it("writes on the inputs", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<ComponentForTesting>
					<VisualizeCredentialProp
						label="test text field"
						locked={false}
						visible={true}
						propName="email"
					/>
				</ComponentForTesting>
			</Provider>
		)

		const textField = getByTestId("test_text_field") as HTMLInputElement

		fireEvent.change(textField, { target: { value: "testing" } })

		expect(textField.value).toBe("testing")
	})
})
