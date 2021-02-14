import { render, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import store from "../../../../redux/store"

import TranslateButton from "./index"

import { translate } from "../../../../lang"
import es from "../../../../lang/es.json"
import en from "../../../../lang/en.json"
import jp from "../../../../lang/jp.json"

describe("the translate button works properly", () => {
	it("renders properly", () => {
		const { queryByTitle } = render(
			<Provider store={store}>
				<TranslateButton />
			</Provider>
		)

		const translateBtn = queryByTitle(translate("translate", "en"))
		// the default lang of the app is english, thats why here the "en" its burned

		expect(translateBtn).toBeTruthy()
	})

	it("translates properly", () => {
		const { queryByTitle } = render(
			<Provider store={store}>
				<TranslateButton />
			</Provider>
		)

		const translateBtn = queryByTitle(translate("translate", "en"))

		translateBtn && fireEvent.click(translateBtn)

		const translateOptionEsp = queryByTitle("test_translation_to_es")
		const translateOptionJpn = queryByTitle("test_translation_to_jp")
		const translateOptionEng = queryByTitle("test_translation_to_en")

		expect(translateOptionEsp).toBeTruthy()
		expect(translateOptionJpn).toBeTruthy()
		expect(translateOptionEng).toBeTruthy()

		// it translates properly to spanish
		translateOptionEsp && fireEvent.click(translateOptionEsp)

		expect(translateBtn?.getAttribute("title")).toBe(es.translate[0])

		// it translates properly to japanese
		translateOptionJpn && fireEvent.click(translateOptionJpn)

		expect(translateBtn?.getAttribute("title")).toBe(jp.translate[0])

		// it translates properly back to english
		translateOptionEng && fireEvent.click(translateOptionEng)

		expect(translateBtn?.getAttribute("title")).toBe(en.translate[0])
	})
})
