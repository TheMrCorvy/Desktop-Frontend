import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: "flex",
			alignItems: "center",
			minHeight: 50,
			textAlign: "center",
			justifyContent: "center",
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
			backgroundColor: theme.palette.background.default,
			padding: 20,
		},
		stepperContent: {
			backgroundColor: theme.palette.background.default,
			padding: 25,
		},
		stepperFooter: {
			backgroundColor: theme.palette.background.default,
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		},
	})
)

export default useStyles
