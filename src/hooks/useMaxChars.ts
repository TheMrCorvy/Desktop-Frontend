import { CharSizesT } from "../misc/types"

const calcMaxChar = (option: CharSizesT): number => {
	//these values are the maximum characters that some columns in the database can store
	switch (option) {
		case "xs":
			return 50
		case "sm":
			return 190
		case "md":
			return 250
		case "lg":
			return 500
		case "xl":
			return 1000

		default:
			return 0
	}
}

export default calcMaxChar
