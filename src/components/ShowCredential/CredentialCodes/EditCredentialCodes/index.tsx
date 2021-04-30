import React, { FC } from "react"

import { Button, Grid } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../redux/store"

import { translate } from "../../../../lang"

type Props = {
	codes: string[]
}

const useStyles = makeStyles({
	textCenter: {
		textAlign: "center",
	},
})

const EditCredentialCodes: FC<Props> = ({ codes }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<Grid item xs={12} className={classes.textCenter}>
			<Button size="large" color="primary" variant="contained" disableElevation>
				{translate("edit_codes", lng)}
			</Button>
		</Grid>
	)
}

export default EditCredentialCodes
