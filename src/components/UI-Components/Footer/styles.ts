import { makeStyles } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		background: grey[900],
		minHeight: "30vh",
		color: "white",
	},
	container: {
		paddingTop: "3rem",
		paddingBottom: "6rem",
	},
	textCenter: {
		textAlign: "center",
	},
	link: {
		color: "white",
	},
})

export default useStyles
