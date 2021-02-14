import { translate } from "./index"
import en from "./en.json"
import es from "./es.json"
import jp from "./jp.json"

test("translates a text properly", () => {
	expect(translate("app_name", "es")).toBe(es.app_name[0])
	expect(translate("app_name", "en")).toBe(en.app_name[0])
	expect(translate("app_name", "jp")).toBe(jp.app_name[0])

	expect(translate("about_title", "es")).toBe(es.about_title[0])
	expect(translate("about_title", "en")).toBe(en.about_title[0])
	expect(translate("about_title", "jp")).toBe(jp.about_title[0])

	expect(translate("more_info", "es")).toBe(es.more_info[0])
	expect(translate("more_info", "en")).toBe(en.more_info[0])
	expect(translate("more_info", "jp")).toBe(jp.more_info[0])
})

test("translates multiple texts properly", () => {
	expect(translate("landing_texts", "es", 2)).toBe(es.landing_texts[2])
	expect(translate("landing_texts", "en", 2)).toBe(en.landing_texts[2])
	expect(translate("landing_texts", "jp", 2)).toBe(jp.landing_texts[2])

	expect(translate("about_texts", "es", 7)).toBe(es.about_texts[7])
	expect(translate("about_texts", "en", 7)).toBe(en.about_texts[7])
	expect(translate("about_texts", "jp", 7)).toBe(jp.about_texts[7])

	expect(translate("encryption_examples", "es", 3)).toBe(es.encryption_examples[3])
	expect(translate("encryption_examples", "en", 3)).toBe(en.encryption_examples[3])
	expect(translate("encryption_examples", "jp", 3)).toBe(jp.encryption_examples[3])
})
