import { fireEvent, render } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../redux/store"

import CreateCredentialProp from "./index"

it("renders all layouts options properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<CreateCredentialProp
				accessCredentialProp="description"
				editCredentialProp={(editing: any) => {}}
				label="test layout"
				layout="multiline"
				defaultExpanded
			/>
			<CreateCredentialProp
				accessCredentialProp="description"
				editCredentialProp={(editing: any) => {}}
				label="test layout"
				layout="multiple codes"
				defaultExpanded
			/>
			<CreateCredentialProp
				accessCredentialProp="description"
				editCredentialProp={(editing: any) => {}}
				label="test layout"
				layout="select option"
				defaultExpanded
			/>
			<CreateCredentialProp
				accessCredentialProp="description"
				editCredentialProp={(editing: any) => {}}
				label="test layout"
				layout="sqa"
				defaultExpanded
			/>
			<CreateCredentialProp
				accessCredentialProp="description"
				editCredentialProp={(editing: any) => {}}
				label="test layout"
				layout="text field"
				defaultExpanded
			/>
		</Provider>
	)

	const multiline = getByTestId("test_multiline")

	expect(multiline).toBeTruthy()

	const multipleCodes = getByTestId("test_edit_codes")

	expect(multipleCodes).toBeTruthy()

	const selectOption = getByTestId("test_select_option")

	expect(selectOption).toBeTruthy()

	const question = getByTestId("test_sqa_question")

	expect(question).toBeTruthy()

	const answer = getByTestId("test_sqa_answer")

	expect(answer).toBeTruthy()

	const textField = getByTestId("test_text_field")

	expect(textField).toBeTruthy()
})

it("renders all options properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<CreateCredentialProp
				accessCredentialProp="description"
				editCredentialProp={(editing: any) => {}}
				label="test is mandatory & max char"
				layout="text field"
				defaultExpanded
				maxChar={1}
				isMandatory={true}
			/>
		</Provider>
	)

	const isMandatory = getByTestId("test_mandatory")

	expect(isMandatory.innerHTML).toBe("(Mandatory)")

	const maxChar = getByTestId("test_max_char")

	expect(maxChar.innerHTML).toBe("0 / 1")
})

describe("testing accordion & writing on the input", () => {
	it("opens accordion properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CreateCredentialProp
					accessCredentialProp="description"
					editCredentialProp={(editing: any) => {}}
					label="test default expanded"
					layout="multiline"
				/>
			</Provider>
		)
	})

	it("writes on the inputs properly", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<CreateCredentialProp
					accessCredentialProp="description"
					editCredentialProp={(editing: any) => {}}
					label="test layout"
					layout="text field"
				/>
			</Provider>
		)

		const accordion = getByTestId("test_accordion")

		expect(accordion).toBeTruthy()

		fireEvent.click(accordion)

		const textField = getByTestId("test_text_field") as HTMLInputElement

		expect(textField).toBeTruthy()

		fireEvent.change(textField, { target: { value: "testing" } })

		expect(textField.value).toBe("testing")
	})
})
