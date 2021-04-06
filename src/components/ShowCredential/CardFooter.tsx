import React from "react"

import { AccordionActions, Button, Divider } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const CardFooter = ({ locked, visible }: { locked: boolean; visible: boolean }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	if (!locked || visible) {
		return (
			<>
				<Divider />
				<AccordionActions>
					{visible && <Button color="secondary">{translate("actions", lng, 0)}</Button>}

					{!locked && (
						<Button size="small" className={classes.btn}>
							{translate("actions", lng, 1)}
						</Button>
					)}
				</AccordionActions>
			</>
		)
	} else {
		return null
	}
}

export default CardFooter
