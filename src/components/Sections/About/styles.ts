import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginTop: "10rem",
			paddingBottom: "10rem",
			position: "relative",
		},
		textCenter: {
			textAlign: "center",
		},
		marginB: {
			marginBottom: "3rem",
		},
		infoBtn: {
			position: "absolute",
			bottom: 100,
			right: 20,
		},
		primaryColor: {
			color: theme.palette.primary.main,
		},
	})
)

export default useStyles
