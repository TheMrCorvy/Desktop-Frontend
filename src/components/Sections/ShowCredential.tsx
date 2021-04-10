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
import ShowInfo from "../ShowCredential/ShowInfo"

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

	const toggleVisibility = (agent: string) => {
		if (!locked && visible) {
			setLocked(true)
		}

		setVisible(!visible)

		console.log(agent)
	}

	const toggleLock = () => {
		if (!visible && locked) {
			setVisible(true)
		}

		setLocked(!locked)
	}

	return (
		<>
			<Grid item xs={12} md={3}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={3}>
							<Grid item className={classes.title}>
								<Typography variant="h6">{credential.company_name}</Typography>
							</Grid>
							<Grid item className={classes.lockIcon}>
								<GoBackBtn />
							</Grid>
						</Grid>
					</Grid>
					{credential.description && (
						<Grid item xs={12}>
							<Typography variant="body1">{credential.description}</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<Typography variant="body2">
									{translate("credential_info", lng, 0)}:
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="body2">
									{credential.created_at}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<Typography variant="body2">
									{translate("credential_info", lng, 1)}:
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="body2">
									{credential.updated_at}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justify="space-between" spacing={2}>
							<Grid item>
								<Typography variant="body2">
									{translate("credential_info", lng, 2)}:
								</Typography>
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="body2">
									{credential.last_seen}
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Grid container justify="space-around">
							<Grid item>
								<DisplayData toggleDisplay={toggleVisibility} visible={visible} />
							</Grid>
							<Grid item className={classes.lockIcon}>
								<UnlockData
									toggleLock={toggleLock}
									locked={locked}
									lockedTitle={translate("access_management", lng, 3)}
									unlockedTitle={translate("access_management", lng, 2)}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} md={9}>
				<Grid container spacing={4}>
					<ShowInfo credential={credential} visible={visible} locked={locked} />
				</Grid>
			</Grid>
		</>
	)
}
export default ShowCredential