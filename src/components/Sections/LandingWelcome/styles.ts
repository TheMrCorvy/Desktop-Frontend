import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			maxWidth: "90%",
			width: "60rem",
			paddingBottom: 40,
			paddingTop: 30,
			borderRadius: 5,
		},
		cardActions: {
			display: "flex",
			justifyContent: "center",
		},
		paperMain: {
			height: "80vh",
			display: "flex",
			justifyContent: "center",
			flexDirection: "column",
			alignItems: " center",
			textAlign: "center",
			borderBottomLeftRadius: 10,
			borderBottomRightRadius: 10,

			[theme.breakpoints.down("xs")]: {
				height: "90vh",
			},
		},
		mainSpacing: {
			marginTop: 50,
		},
		secondarySpacing: {
			marginTop: 10,
		},
		welcomeSection: {
			height: "100vh",
		},
	})
)

export default useStyles
