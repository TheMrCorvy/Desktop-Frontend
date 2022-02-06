import { FC, useEffect, useState } from "react"

/******************************************************************************** mui */
import {
	Container,
	Grid,
	Typography,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	TextField,
} from "@material-ui/core"

import useStyles from "./styles"

/******************************************************************************** redux */
import { showError } from "../../redux/actions/errorHandlingActions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

/******************************************************************************** components */
import FeedbackForm from "../../components/Sections/FeedbackForm"
import Downloads from "../../components/Sections/Downloads"
import AccessManagement from "../../components/Sections/AccessManagement"
import CredentialCard from "../../components/UI-Components/CredentialCard"
import RecentAccessTable from "../../components/Sections/RecentAccessTable"
import UpdateRole from "../../components/Sections/UpdateRole"
import CopyText from "../../components/Utils/CopyText"

/******************************************************************************** indexedDB */
import { getUser, getCredentials } from "../../misc/indexedDB"

/******************************************************************************** types */
import { CredentialT, UserT } from "../../misc/types"

const MyAccount: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const { REACT_APP_ENV_LOCAL } = process.env

	const [user, setUser] = useState<UserT | null>(null)

	const [credentials, setCredentials] = useState<CredentialT[]>([])

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		obtainFromDB("credentials")
		obtainFromDB("user")
	}, [])

	const obtainFromDB = async (option: string) => {
		let data: any

		option === "user" ? (data = await getUser()) : (data = await getCredentials())

		if (data === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		option === "user" ? setUser(data) : setCredentials(data)
	}

	const isUserAllowed = () => {
		if (user !== null) {
			if (user.role === "premium") {
				return <FeedbackForm />
			}
		}

		return null
	}

	const canBuySlots = () => {
		// user exists?
		if (user !== null) {
			// user is already premium?
			if (user.role !== "premium") {
				// user can purchase more slots?
				if (user.slots_available + credentials.length < 20) {
					return true
				}
			}
		}

		return false
	}

	return (
		<Container maxWidth="xl" className={classes.container}>
			<Grid container justify="center">
				<AccessManagement testing={REACT_APP_ENV_LOCAL ? true : false} />

				{user && (
					<Grid item xs={12} md={6} lg={5} className={classes.availableSlots}>
						<Card style={{ borderRadius: 8 }}>
							<CardActionArea>
								<CopyText body={user.invitation_code}>
									<>
										<CardHeader title={translate("invitation_code", lng)} />
										<CardContent>
											<TextField
												variant="filled"
												disabled
												defaultValue={user.invitation_code}
											/>
										</CardContent>
										<CardActions
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												textAlign: "center",
											}}
										>
											<Typography color="secondary" variant="subtitle1">
												{translate("click_to_copy", lng)}
											</Typography>
										</CardActions>
									</>
								</CopyText>
							</CardActionArea>
						</Card>
					</Grid>
				)}

				{user && user.slots_available >= 1 && (
					<Grid item xs={12} md={10} lg={8} className={classes.availableSlots}>
						<Grid container spacing={4} justify="space-around">
							<Grid item xs={12}>
								<RecentAccessTable />
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h5">
									{translate("available_slots", lng)}
								</Typography>
							</Grid>

							<CredentialCard
								availableSlots={user.slots_available}
								credentials={[]}
							/>
						</Grid>
					</Grid>
				)}

				{user && <UpdateRole userRole={user.role} canBuySlots={canBuySlots()} />}
			</Grid>
			{isUserAllowed()}
			<Downloads />
		</Container>
	)
}

export default MyAccount
