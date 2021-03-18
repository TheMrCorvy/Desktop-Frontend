import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

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

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

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

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	card: {
		borderRadius: 8,
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

const RecentAccessTable = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [credentials, setCredentials] = useState<RecentlySeenT[]>([])

	const [loading, setLoading] = useState(true)

	const classes = useStyles()

	useEffect(() => {
		//fake api call on component did mount
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
							<Table className={classes.table} size="small">
								<TableHead>
									<TableRow>
										<TableCell align="center">
											{translate("recently_seen", lng, 1)}
										</TableCell>
										<TableCell align="center">
											{translate("recently_seen", lng, 2)}
										</TableCell>
										<TableCell align="center">
											{translate("recently_seen", lng, 3)}
										</TableCell>
										<TableCell align="center">
											{translate("recently_seen", lng, 4)}
										</TableCell>
										<TableCell align="center">
											{translate("recently_seen", lng, 5)}
										</TableCell>
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
												{translate("recently_seen", lng, 6)}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						{credentials.length >= 1 && (
							<Typography variant="body2" className={classes.subTitle}>
								{translate("recently_seen", lng, 7)}
							</Typography>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default RecentAccessTable
