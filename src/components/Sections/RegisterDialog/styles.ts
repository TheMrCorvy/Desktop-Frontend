import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialogButton: {
			boxShadow: "none",
			marginBottom: "2rem",
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
		recommendedLinks: {
			marginRight: 15,
			color: theme.palette.primary.main,
		},
	})
)

export default useStyles
