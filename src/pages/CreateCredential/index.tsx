import { FC } from "react"

import { Container, Grid, Typography } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { translate } from "../../lang"

import GoBackBtn from "../../components/Utils/GoBackBtn"
import CreateCredentialForm from "../../components/Sections/CreateCredentialForm"

const CreateCredential: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<>
			<Container maxWidth="xl" className={classes.container}>
				<Grid container justify="space-around" spacing={4}>
					<Grid item xs={12} className={classes.textCenter}>
						<Typography variant="h2">{translate("create_credential", lng)}</Typography>
					</Grid>
					<Grid item xs={12} className={classes.textCenter}>
						<GoBackBtn />
					</Grid>

					<CreateCredentialForm />
				</Grid>
			</Container>
		</>
	)
}

export default CreateCredential
