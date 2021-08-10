import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		stopPremiumBtn: {
			color: "white",
			background: theme.palette.error.main,
			"&:hover": {
				background: theme.palette.error.dark,
			},
		},
	})
)

export default useStyles
