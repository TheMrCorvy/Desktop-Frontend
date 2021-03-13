import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "../../redux/store"

import { recommendedTwoFactorApps, recommendedApps } from "../../misc/staticData"

import DownloadsPage from "./index"

it("renders properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<DownloadsPage />
			</BrowserRouter>
		</Provider>
	)

	const downloadsPage = getByTestId("test_downloads_page")

	expect(downloadsPage).toBeTruthy()
})

it("renders all recommendations properly", () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<DownloadsPage />
			</BrowserRouter>
		</Provider>
	)

	const twoFactorRecomendation = recommendedTwoFactorApps("en")[2]

	const otherRecomendation = recommendedApps("en")[2]

	const ddg = getByTestId(otherRecomendation.appName)

	expect(ddg.innerHTML).toBe(otherRecomendation.appName)

	const twilioAuthy = getByTestId(twoFactorRecomendation.appName)

	expect(twilioAuthy.innerHTML).toBe(twoFactorRecomendation.appName)
})
