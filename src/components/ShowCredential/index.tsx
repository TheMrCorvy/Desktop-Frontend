import React, { useState } from "react"
import { CredentialT } from "../../misc/types"

import { Grid, Typography } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import UnlockData from "../UnlockData"
import DisplayData from "../DisplayData"
import GoBackBtn from "../GoBackBtn"
import ShowInfo from "./ShowInfo"

type Props = {
	credential: CredentialT
}

const useStyles = makeStyles({
	title: {
		display: "flex",
		textAlign: "center",
		alignItems: "center",
		textTransform: "capitalize",
	},
	lockIcon: {
		display: "flex",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
	},
})

const ShowCredential = ({ credential }: Props) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [locked, setLocked] = useState(true)

	const [visible, setVisible] = useState(false)

	const classes = useStyles()

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<>
			<Grid item xs={4} sm={5} className={classes.title}>
				<Typography variant="h6">{credential.company_name}</Typography>
			</Grid>
			<Grid item xs={2} sm={1} className={classes.lockIcon}>
				<GoBackBtn />
			</Grid>
			<Grid item xs={2} sm={5}>
				<DisplayData toggleDisplay={toggleVisibility} visible={visible} />
			</Grid>
			<Grid item xs={2} sm={1} className={classes.lockIcon}>
				<UnlockData toggleLock={() => setLocked(!locked)} locked={locked} />
			</Grid>

			<ShowInfo credential={credential} visible={visible} locked={locked} />

			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12} sm={6} md={4} className={(classes.title, classes.lockIcon)}>
						<Typography variant="h6">
							{translate("credential_info", lng, 0)}: {credential.created_at}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4} className={(classes.title, classes.lockIcon)}>
						<Typography variant="h6">
							{translate("credential_info", lng, 1)}: {credential.updated_at}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4} className={(classes.title, classes.lockIcon)}>
						<Typography variant="h6">
							{translate("credential_info", lng, 2)}: {credential.last_seen}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}
export default ShowCredential
