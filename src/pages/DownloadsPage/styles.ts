import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		divider: {
			marginBottom: "5rem",
			marginTop: "5rem",
		},
		recommendedLinks: {
			marginRight: 35,
			color: theme.palette.primary.main,
		},
		marginBottom: {
			marginBottom: "3rem",
		},
		landingSection: {
			minHeight: "70vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		container: {
			paddingBottom: "5rem",
			paddingTop: "2rem",
		},
	})
)

export default useStyles
