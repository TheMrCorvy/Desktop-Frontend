import { FC } from "react"

import { Divider, AccordionActions, Button } from "@material-ui/core"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"
import { removeCredentialProp } from "../../../redux/actions/credentialActions"

import CopyText from "../../CopyText"
import { AccessCredentialPropT } from "../../../misc/types"
import { translate } from "../../../lang"

const CardFooter: FC<Props> = ({ textToCopy, label, locked, propName }) => {
	const { credential } = useSelector((state: RootState) => state.credential)
	const { lng } = useSelector((state: RootState) => state.lng)

	const dispatch = useDispatch()

	const remove = () => {
		dispatch(removeCredentialProp(credential, propName))
	}

	return (
		<>
			<Divider />
			<AccordionActions>
				{!locked && credential[propName] && (
					<Button color="primary" onClick={remove}>
						{translate("delete", lng)}
					</Button>
				)}
				<div style={{ flexGrow: 1 }} />
				<CopyText body={textToCopy}>
					<Button color="secondary">{label}</Button>
				</CopyText>
			</AccordionActions>
		</>
	)
}

type Props = {
	textToCopy: string
	label: string
	locked: boolean
	propName: AccessCredentialPropT
}

export default CardFooter
