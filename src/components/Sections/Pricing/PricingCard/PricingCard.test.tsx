import { render } from "@testing-library/react"

import { Provider } from "react-redux"

import store from "../../../../redux/store"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faSyncAlt,
	faLock,
	faLockOpen,
	faFingerprint,
	faWallet,
	faUsers,
	faStar,
} from "@fortawesome/free-solid-svg-icons"
library.add(faSyncAlt, faLock, faLockOpen, faFingerprint, faWallet, faUsers, faStar)

import PricingCard, { PricingCardT } from "./index"

it("renders properly, and shows text properly", () => {
	const testCard: PricingCardT = {
		title: "test title",
		subtitle: "test subtitle",
		listItems: [
			{
				icon: "sync-alt",
				text: "test 1st text",
			},
			{
				icon: "lock",
				text: "test 2nd text",
			},
			{
				icon: "fingerprint",
				text: "test 3rd text",
			},
		],
		cardElevation: 0,
		buttonText: "test btn",
		linkUrl: "/register",
	}

	const { getByTestId, getByText } = render(
		<Provider store={store}>
			<PricingCard
				title={testCard.title}
				subtitle={testCard.subtitle}
				cardElevation={testCard.cardElevation}
				listItems={testCard.listItems}
				buttonText={testCard.buttonText}
			/>
		</Provider>
	)

	const pricingCard = getByTestId("test_pricing_card")

	expect(pricingCard).toBeTruthy()

	//first item
	const firstText = getByText("test 1st text")

	expect(firstText.innerHTML).toBe(testCard.listItems[0].text)

	//second item
	const secondText = getByText("test 2nd text")

	expect(secondText.innerHTML).toBe(testCard.listItems[1].text)

	//third item
	const thirdText = getByText("test 3rd text")

	expect(thirdText.innerHTML).toBe(testCard.listItems[2].text)
})
