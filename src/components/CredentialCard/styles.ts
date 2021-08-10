import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			backgroundColor: red[500],
			color: "white",
		},
		card: {
			background: theme.palette.type === "dark" ? theme.palette.background.default : "white",
			height: "100%",
			borderRadius: 8,
		},
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
		lineHeight: {
			lineHeight: 1.5,
			textTransform: "capitalize",
		},
		addCredential: {
			flexGrow: 1,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			minHeight: "100%",
		},
		cardAlter: {
			borderStyle: "dashed",
			background: theme.palette.background.default,
			height: "100%",
			borderRadius: 8,
			minHeight: "7rem",
		},
		cardAction: {
			minHeight: "100%",
		},
		textPrimary: {
			color: theme.palette.info.main,
		},
		link: {
			textDecoration: "none",
		},
	})
)

export default useStyles
