import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
		},
		centerAll: {
			minHeight: "100vh",

			[theme.breakpoints.down("sm")]: {
				marginTop: "4rem",
			},
			[theme.breakpoints.up("md")]: {
				display: "flex",
				alignItems: "center",
				marginTop: "1rem",
			},
		},
		card: {
			borderRadius: 7,

			[theme.breakpoints.down("sm")]: {
				marginBottom: "4rem",
			},
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
		captcha: {
			display: "flex",
			justifyContent: "center",
		},
	})
)

export default useStyles
