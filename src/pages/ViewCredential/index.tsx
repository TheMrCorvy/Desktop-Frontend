import { FC } from "react"

/************************************************************************************ mui related */
import { Container, Grid, Typography, Button } from "@material-ui/core"

import useStyles from "./styles"

/************************************************************************************ redux related */
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import useCredential from "./useCredential"

/************************************************************************************ components */
import Snackbar from "../../components/Utils/Snackbar"
import ShowCredential from "../../components/Sections/ShowCredential"

const ViewCredential: FC = (props: any) => {
	const dispatch = useDispatch()

	const { token } = useSelector((state: RootState) => state.token)
	const { lng } = useSelector((state: RootState) => state.lng)

	const credentialId = props.match.params.credentialId

	const classes = useStyles()
	const { error, snackbarMessage, getFromApi } = useCredential({
		dispatch,
		token,
		lng,
		credentialId,
	})

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify={error ? "space-around" : "space-between"} spacing={4}>
				{error ? (
					<>
						<Grid item xs={12} className={classes.error}>
							<Typography variant="subtitle1" gutterBottom paragraph>
								{translate("error_messages", lng, 1)}
							</Typography>
							<Button
								variant="contained"
								className={classes.errorBtn}
								disableElevation
								size="large"
								onClick={() => getFromApi(false)}
							>
								{translate("retry", lng)}
							</Button>
						</Grid>
						<Snackbar open={error} message={snackbarMessage} />
					</>
				) : (
					<ShowCredential />
				)}
			</Grid>
		</Container>
	)
}

export default ViewCredential
