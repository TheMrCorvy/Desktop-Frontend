import en from "./en.json"
import es from "./es.json"
import jp from "./jp.json"

export const translate = (key: string, language: string): string => {
	let langData: { [key: string]: string } = {}

	switch (language) {
		case "EN":
			langData = en
			break
		case "ES":
			langData = es
			break
		case "JP":
			langData = jp
			break

		default:
			langData = en
			break
	}

	return langData[key]
}
