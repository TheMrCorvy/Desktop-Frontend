import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
	btn: {
		textTransform: "none",
		"&:hover": {
			boxShadow:
				"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
		},
	},
	formControl: {
		marginBottom: 20,
	},

	continueBtn: {
		borderColor: "#1ebd2d",
		color: "#1ebd2d",
		"&:hover": {
			borderColor: "#1cad29",
			backgroundColor: "rgba(30,189,45, 0.1)",
			color: "#1cad29",
		},
	},
})

export default useStyles
