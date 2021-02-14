import { translate } from "./index"
import en from "./en.json"
import es from "./es.json"
import jp from "./jp.json"

test("translates texts properly", () => {
	expect(translate("app_name", "es")).toBe(es.app_name[0])
	expect(translate("app_name", "en")).toBe(en.app_name[0])
	expect(translate("app_name", "jp")).toBe(jp.app_name[0])
})

test("translates multiple texts properly", () => {
	expect(translate("landing_texts", "es", 2)).toBe(es.landing_texts[2])
	expect(translate("landing_texts", "en", 2)).toBe(en.landing_texts[2])
	expect(translate("landing_texts", "jp", 2)).toBe(jp.landing_texts[2])

	expect(translate("landing_texts", "es", 7)).toBe(es.landing_texts[7])
	expect(translate("landing_texts", "en", 7)).toBe(en.landing_texts[7])
	expect(translate("landing_texts", "jp", 7)).toBe(jp.landing_texts[7])
})
