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
		textCenter: {
			textAlign: "center",
		},
		submitBtn: {
			borderRadius: 8,
			marginTop: 30,
		},
	})
)

export default useStyles
