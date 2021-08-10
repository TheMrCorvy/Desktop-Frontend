import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
		},
		centerAll: {
			minHeight: "100vh",
			display: "flex",
			alignItems: "center",
			textAlign: "center",
		},
		button: {
			textDecoration: "none",
		},
		textDanger: {
			color: theme.palette.error.main,
		},
		dangerBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

export default useStyles
