import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { purple, indigo } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		linuxBtn: {
			backgroundColor: purple[400],
			"&:hover": {
				backgroundColor: purple[500],
			},
		},
		webBtn: {
			backgroundColor: indigo["A400"],
			"&:hover": {
				backgroundColor: indigo["A700"],
			},
		},
		androidBtn: {
			backgroundColor: theme.palette.type === "dark" ? "#1fad2c" : "#1ebd2d",
			"&:hover": {
				backgroundColor: theme.palette.type === "dark" ? "#15a122" : "#1cad29",
			},
		},
		container: {
			paddingTop: 65,
			paddingBottom: 45,
			textAlign: "center",

			[theme.breakpoints.down("xs")]: {
				paddingTop: 0,
			},
		},
		marginB: {
			marginBottom: 30,
		},
		underline: {
			borderBottom: "1px solid",
		},
	})
)

export default useStyles
