import React, { FC } from "react"

import { AccordionActions, Button, Divider } from "@material-ui/core"

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { translate } from "../../lang"

import CopyText from "../CopyText"

type Props = {
	locked: boolean
	visible: boolean
	textToCopy: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			color: theme.palette.error.main,
		},
	})
)

const CardFooter: FC<Props> = ({ locked, visible, textToCopy }) => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	if (!locked || visible) {
		return (
			<>
				<Divider />
				<AccordionActions>
					{visible && (
						<CopyText body={textToCopy}>
							<Button color="secondary">{translate("actions", lng, 0)}</Button>
						</CopyText>
					)}

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
