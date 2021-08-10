import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			background: theme.palette.type === "dark" ? "#333" : "#f2f2f2",
			minHeight: "100vh",
			paddingTop: "5.5rem",
			paddingBottom: "5.5rem",

			[theme.breakpoints.down("xs")]: {
				paddingTop: "1rem",
			},
		},
		error: {
			minHeight: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			flexDirection: "column",
		},
		errorBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

export default useStyles
