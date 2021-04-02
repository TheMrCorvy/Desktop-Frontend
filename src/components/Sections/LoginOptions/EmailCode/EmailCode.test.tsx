import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import EmailCode from "./index"

it("renders main email code form properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<EmailCode
				onAuthSuccess={() => {}}
				endpoint=""
				isRobot={false}
				testing={true}
				isRecovery={false}
			/>
		</Provider>
	)

	const mainEmailCodeForm = getByTestId("test_main_email_form")

	expect(mainEmailCodeForm).toBeTruthy()
})

it("renders recovery email code form properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<EmailCode
				onAuthSuccess={() => {}}
				endpoint=""
				isRobot={false}
				testing={true}
				isRecovery={true}
			/>
		</Provider>
	)

	const recoveryEmailCodeForm = getByTestId("test_recovery_email_form")

	expect(recoveryEmailCodeForm).toBeTruthy()
})

describe("checking if the user can write properly on the form", () => {
	it("writes on the email to send code input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<EmailCode
					onAuthSuccess={() => {}}
					endpoint=""
					isRecovery={false}
					isRobot={false}
					testing={true}
				/>
			</Provider>
		)

		const email = "email@email.com"

		const emailInput = getByTestId("test_email_to_send_code") as HTMLInputElement

		fireEvent.change(emailInput, { target: { value: email } })

		expect(emailInput.value).toBe(email)
	})

	it("writes on the code input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<EmailCode
					onAuthSuccess={() => {}}
					endpoint=""
					isRecovery={false}
					isRobot={false}
					testing={true}
				/>
			</Provider>
		)

		const code = "123456"

		const codeInput = getByTestId("test_verification_code") as HTMLInputElement

		fireEvent.change(codeInput, { target: { value: code } })

		expect(codeInput.value).toBe(code)
	})
})

describe("checking if the user can write properly on the recovery email form", () => {
	it("writes on the main email input", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<EmailCode
					onAuthSuccess={() => {}}
					endpoint=""
					isRecovery={true}
					isRobot={false}
					testing={true}
				/>
			</Provider>
		)

		const email = "email@email.com"

		const mainEmailInput = getByTestId("test_main_email") as HTMLInputElement

		fireEvent.change(mainEmailInput, { target: { value: email } })

		expect(mainEmailInput.value).toBe(email)
	})
})
