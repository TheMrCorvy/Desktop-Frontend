import React, { useEffect, useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"

import {
	Card,
	CardContent,
	TableRow,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	CircularProgress,
	Typography,
} from "@material-ui/core"

import { recentlySeen4Testing } from "../../../misc/Data4Testing"

export type RecentlySeenT = {
	name: string
	recently_seen: string
	id: 1
	created_at: string
	updated_at: string
	coords: string
	device: string
	version: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			minWidth: 650,
		},
		card: {
			borderRadius: 10,
			marginBottom: "3rem",
		},
		marginTop: {
			marginTop: 20,
		},
		textCapitalize: {
			textTransform: "capitalize",
		},
		subTitle: {
			marginTop: 25,
			float: "left",
			paddingBottom: 25,
		},
	})
)

const RecentAccessTable = () => {
	const [credentials, setCredentials] = useState<RecentlySeenT[]>([])

	const [loading, setLoading] = useState(true)

	const classes = useStyles()

	useEffect(() => {
		setTimeout(() => {
			setCredentials(recentlySeen4Testing)

			setLoading(false)
		}, 5000)
	}, [])

	return (
		<Card className={classes.card} elevation={2}>
			<CardContent>
				{loading ? (
					<CircularProgress color="primary" className={classes.marginTop} />
				) : (
					<>
						<TableContainer>
							<Table
								className={classes.table}
								size="small"
								aria-label="a dense table"
							>
								<TableHead>
									<TableRow>
										<TableCell>Credential</TableCell>
										<TableCell align="center">Date</TableCell>
										<TableCell align="center">Where</TableCell>
										<TableCell align="center">Device</TableCell>
										<TableCell align="center">Version</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{credentials.length >= 1 ? (
										credentials.map((credential) => (
											<TableRow key={credential.id}>
												<TableCell
													component="th"
													scope="row"
													className={classes.textCapitalize}
												>
													{credential.name}
												</TableCell>
												<TableCell align="right">
													{credential.recently_seen}
												</TableCell>
												<TableCell align="right">
													{credential.coords}
												</TableCell>
												<TableCell align="right">
													{credential.device}
												</TableCell>
												<TableCell
													align="right"
													className={classes.textCapitalize}
												>
													{credential.version}
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5}>
												There are no recently seen credentials
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						{credentials.length >= 1 && (
							<Typography variant="body2" className={classes.subTitle}>
								DATE FORMAT: Year-Month-Day Hour : Minute : Seconds
							</Typography>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default RecentAccessTable
