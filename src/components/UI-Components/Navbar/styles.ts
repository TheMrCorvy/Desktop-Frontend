import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbarItem: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
			color: "white",
		},
		title: {
			flexGrow: 1,
		},
		appBar: {
			top: "auto",
			bottom: 0,
		},
		grow: {
			flexGrow: 1,
		},
		fabButton: {
			position: "absolute",
			zIndex: 1,
			top: -30,
			left: 0,
			right: 0,
			margin: "0 auto",
		},
		link: {
			textDecoration: "none",
			color: "inherit",
		},
	})
)

export default useStyles
