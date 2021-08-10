import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginTop: "10rem",
			marginBottom: "5rem",
			textAlign: "center",
		},
		textLeft: {
			textAlign: "left",
		},
		alignCenter: {
			display: "flex",
			alignItems: "center",
		},
		textDanger: {
			color: theme.palette.error.main,
		},
	})
)

export default useStyles
