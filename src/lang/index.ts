import en from "./en.json"
import es from "./es.json"
import jp from "./jp.json"

/**
 * @alias Translate
 *
 * @module Translation
 *
 * @description This is the function that returns the text for all the components that use the translation feature.
 *
 * @param {string} key The key to access the JSON file
 *
 * @param {"es" | "en" | "jp"} language Tha language that is required
 *
 * @param {number} [index] The position on the array where is the needed text
 *
 * @example
 *
 * const translation = translate("hello_world", "es", 0)
 *
 * console.log("translation") // "Hola Mundo!"
 *
 * @returns The string stored on the given key
 */

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
