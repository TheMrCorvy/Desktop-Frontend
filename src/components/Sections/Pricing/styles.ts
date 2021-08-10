import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		infoBtn: {
			position: "absolute",
			bottom: 30,
			left: 30,
			boxShadow: "none",

			[theme.breakpoints.down("xs")]: {
				bottom: 20,
				left: 20,
			},
		},
		paper: {
			flexGrow: 1,
			paddingBottom: "5rem",
			position: "relative",
		},
		paddingTopL: {
			paddingTop: 50,
		},
		title: {
			paddingTop: 50,
			textAlign: "center",
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
	})
)

export default useStyles
