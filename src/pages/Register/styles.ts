import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			paddingTop: "4rem",
			paddingBottom: "2rem",

			[theme.breakpoints.down("sm")]: {
				paddingTop: 0,
			},
		},
		centerAll: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			textAlign: "center",

			[theme.breakpoints.up("sm")]: {
				marginTop: "1rem",
			},
		},
		card: {
			borderRadius: 7,
			marginTop: "1rem",
		},
		cardActions: {
			display: "flex",
			justifyContent: "space-between",
		},
		link: {
			textDecoration: "none",
		},
		cardSubheader: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
			textAlign: "center",
		},
		cardHeader: {
			textAlign: "center",
		},
		cardContent: {
			paddingRight: 0,
			paddingLeft: 0,
		},
		centerCaptcha: {
			display: "flex",
			alignItems: "center",
			textAlign: "center",
			justifyContent: "center",
		},
	})
)

export default useStyles
