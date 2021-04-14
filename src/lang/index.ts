import en from "./en.json"
import es from "./es.json"
import jp from "./jp.json"

export const translate = (key: string, language: string, index?: number) => {
	let langData: { [key: string]: string[] } = {}

	switch (language) {
		case "en":
			langData = en
			break
		case "es":
			langData = es
			break
		case "jp":
			langData = jp
			break

		default:
			langData = en
			break
	}

	return langData[key][index ? index : 0]
}
