import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
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
})

export default useStyles
