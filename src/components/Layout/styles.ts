import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			minHeight: "100vh",
			flexGrow: 1,
		},
		backToTop: {
			position: "fixed",
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
	})
)

export default useStyles
