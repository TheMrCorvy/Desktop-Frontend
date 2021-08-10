import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
		borderRadius: {
			borderRadius: 8,
		},
		marginTop: {
			marginTop: "3rem",
		},
		smallMarginTop: {
			marginTop: 20,
		},
		textCenter: {
			textAlign: "center",
		},
		exportBtn: {
			backgroundColor: theme.palette.type === "dark" ? "#1fad2c" : "#1ebd2d",
			"&:hover": {
				backgroundColor: theme.palette.type === "dark" ? "#15a122" : "#1cad29",
			},
		},
	})
)

export default useStyles
