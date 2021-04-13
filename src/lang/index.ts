import { getLang } from "../misc/ajaxManager"
import en from "./en.json"
import es from "./es.json"
import jp from "./jp.json"

let calledApi = false

const EsId = "60758115ee971419c4d86369"
const EnId = "607581500ed6f819beaaf6fe"
const JpId = "6075848a0ed6f819beaafb3e"

export const translate = (key: string, language: string, index?: number): string => {
	if (!calledApi) {
		calledApi = true

		Promise.all([getLang(EnId), getLang(EsId), getLang(JpId)]).then((data) => console.log(data))
	}

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
