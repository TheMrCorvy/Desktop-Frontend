import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		antiFishingDialog: {
			boxShadow: "none",
			background: theme.palette.primary.main,
			"&:hover": {
				background: theme.palette.primary.main,
			},
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
	})
)

export default useStyles
