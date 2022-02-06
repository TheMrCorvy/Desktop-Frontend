import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"

import store from "../../../redux/store"

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

import PricingCard from "./index"
import { PricingCardT } from "../../../misc/types"

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
	}

	const { getByTestId, getByText } = render(
		<Provider store={store}>
			<BrowserRouter>
				<PricingCard
					title={testCard.title}
					subtitle={testCard.subtitle}
					cardElevation={testCard.cardElevation}
					listItems={testCard.listItems}
					buttonText={testCard.buttonText}
				/>
			</BrowserRouter>
		</Provider>
	)

	const pricingCard = getByTestId("test_pricing_card")

	expect(pricingCard).toBeTruthy()

	const firstText = getByText("test 1st text")

	expect(firstText.innerHTML).toBe(testCard.listItems[0].text)

	const secondText = getByText("test 2nd text")

	expect(secondText.innerHTML).toBe(testCard.listItems[1].text)

	const thirdText = getByText("test 3rd text")

	expect(thirdText.innerHTML).toBe(testCard.listItems[2].text)
})
