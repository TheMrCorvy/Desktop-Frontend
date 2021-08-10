import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textCenter: {
			textAlign: "center",
		},
		paddingBottomSm: { paddingBottom: 10 },
		card: {
			borderRadius: 8,
		},
		cardAction: {
			display: "flex",
			justifyContent: "center",
			textAlign: "center",
			paddingBottom: "2.5rem",
		},
		divider: {
			marginTop: 10,
			marginBottom: 10,
		},
		textColor: {
			color:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.54)",
		},
		link: {
			textDecoration: "none",
		},
	})
)

export default useStyles
