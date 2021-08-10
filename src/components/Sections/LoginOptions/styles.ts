import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			minWidth: "50%",
			[theme.breakpoints.down("xs")]: {
				minWidth: "70%",
			},
		},
		grid: {
			display: "flex",
			justifyContent: "center",
		},
		container: {
			flexGrow: 1,
			[theme.breakpoints.down("xs")]: {
				minHeight: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
			},
		},
		goBack: {
			display: "flex",
			justifyContent: "center",
			marginTop: 15,
		},
	})
)

export default useStyles
