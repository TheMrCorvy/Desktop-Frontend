import React, { useState } from "react"
import { CredentialT } from "../../misc/types"

import { Grid, Typography } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import UnlockData from "../UnlockData"
import CredentialProperties from "./CredentialProperties"

type Props = {
	credential: CredentialT
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
)

const ShowCredential = ({ credential }: Props) => {
	const [locked, setLocked] = useState(true)

	const classes = useStyles()

	return (
		<>
			<Grid item xs={10} sm={11} className={classes.title}>
				<Typography variant="h6">{credential.company_name}</Typography>
			</Grid>
			<Grid item xs={2} sm={1} className={classes.lockIcon}>
				<UnlockData toggleLock={() => setLocked(!locked)} locked={locked} />
			</Grid>
			<Grid item xs={12} md={6}>
				{credential.email && (
					<CredentialProperties
						locked={locked}
						label="Email"
						subTitle="Show Email"
						opening={credential.email.opening}
						char_count={credential.email.char_count}
						ending={credential.email.ending}
						body={credential.email.email}
					/>
				)}
			</Grid>
		</>
	)
}
export default ShowCredential
