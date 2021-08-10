import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.26)" : "#f5f5f5",
		},
		avatar: {
			backgroundColor: red[500],
			color: "white",
		},
		container: {
			paddingTop: "3rem",
			paddingBottom: "3rem",
		},
		textCenter: {
			textAlign: "center",
		},
		divider: {
			marginBottom: "5rem",
		},
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
	})
)

export default useStyles
