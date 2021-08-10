import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
	container: {
		marginTop: 150,
	},
	verticalDivider: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	text: {
		textAlign: "center",
	},
	listItem: {
		marginBottom: "3rem",
	},
	flatBtn: {
		boxShadow: "none",
	},
})

export default useStyles
