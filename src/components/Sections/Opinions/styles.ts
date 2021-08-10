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
		},
		container: {
			paddingTop: "5rem",
			paddingBottom: "5rem",
		},
		textCenter: {
			textAlign: "center",
		},
		divider: {
			marginBottom: "5rem",
		},
	})
)

export default useStyles
