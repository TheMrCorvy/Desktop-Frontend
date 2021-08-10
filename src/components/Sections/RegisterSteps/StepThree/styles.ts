import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
	centerAll: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	secretKey: {
		color: "#ff6200",
	},
	qrContainer: {
		display: "flex",
		justifyContent: "center",
	},
	cardActionArea: {
		minHeight: "100%",
		borderRadius: 8,
	},
})

export default useStyles
