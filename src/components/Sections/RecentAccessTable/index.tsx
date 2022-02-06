import { FC, useEffect, useState } from "react"

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

import useStyles from "./styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import useFetchCredentials from "./useFetchCredentials"

const RecentAccessTable: FC<Props> = ({ testing }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { token } = useSelector((state: RootState) => state.token)

	const dispatch = useDispatch()
	const classes = useStyles()
	const { credentials, loading } = useFetchCredentials({ lng, token, dispatch, testing })

	return (
		<Card className={classes.card} elevation={2} data-testid="test_recently_seen_table">
			<CardContent>
				{loading ? (
					<CircularProgress color="primary" className={classes.marginTop} />
				) : (
					<>
						<TableContainer>
							<Table className={classes.table} size="small">
								<TableHead>
									<TableRow>
										<TableCell align="left">
											{translate("recently_seen", lng, 1)}
										</TableCell>
										<TableCell align="left">
											{translate("recently_seen", lng, 2)}
										</TableCell>
										<TableCell align="left">
											{translate("recently_seen", lng, 3)}
										</TableCell>
										<TableCell align="right">
											{translate("recently_seen", lng, 4)}
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{credentials.length >= 1 ? (
										credentials.map((credential) => (
											<TableRow
												key={credential.id}
												data-testid={"test_RS_row_" + credential.id}
											>
												<TableCell
													component="th"
													scope="row"
													className={classes.textCapitalize}
												>
													{credential.company_name}
												</TableCell>
												<TableCell align="left">
													{credential.last_seen}
												</TableCell>
												<TableCell align="left">
													{credential.accessing_device}
												</TableCell>
												<TableCell
													align="right"
													className={classes.textCapitalize}
												>
													{credential.accessing_platform}
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5}>
												{translate("recently_seen", lng, 5)}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						{credentials.length >= 1 && (
							<Typography variant="body2" className={classes.subTitle}>
								{translate("recently_seen", lng, 6)}
							</Typography>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

type Props = { testing?: boolean }

export default RecentAccessTable
