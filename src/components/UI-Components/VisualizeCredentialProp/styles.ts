import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: "80%",
			flexShrink: 0,

			[theme.breakpoints.down("xs")]: {
				flexBasis: "70%",
			},
		},
		textColor: {
			color: theme.palette.type === "dark" ? "white" : "black",
		},
		textCenter: {
			textAlign: "center",
		},
	})
)

export default useStyles
