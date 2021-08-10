import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: "7rem",

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
