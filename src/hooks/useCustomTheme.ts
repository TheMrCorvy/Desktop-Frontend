import { createMuiTheme } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"

const useCustomTheme = (theme: "light" | "dark") => {
	return createMuiTheme({
		palette: {
			type: theme,
			primary: {
				light: "#ff6200",
				dark: "#ff6200",
				main: "#ff6200",
				contrastText: "#fff",
			},
			secondary: {
				light: blue["A400"],
				dark: blue["A400"],
				main: blue["A400"],
				contrastText: "#fff",
			},
		},
	})
}

export default useCustomTheme
