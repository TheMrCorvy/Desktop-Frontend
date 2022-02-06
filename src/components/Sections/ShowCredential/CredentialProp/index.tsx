import { FC } from "react"
import { AccessCredentialPropT, CharSizesT, ReduxCredentialT } from "../../../../misc/types"
import { calcMaxChar } from "../../../../misc/staticData"

import VisualizeCredentialProp from "../../../UI-Components/VisualizeCredentialProp"

const CredentialProp: FC<Props> = ({
	credential,
	propName,
	label,
	locked,
	visible,
	maxChar,
	isCrypto,
}) => {
	if (credential[propName]) {
		return (
			<VisualizeCredentialProp
				label={label}
				locked={locked}
				visible={visible}
				propName={propName}
				maxChar={calcMaxChar(maxChar ? maxChar : "sm")}
				isCrypto={isCrypto}
			/>
		)
	}

	if (!locked && !credential[propName]) {
		return (
			<VisualizeCredentialProp
				label={label}
				locked={locked}
				visible={visible}
				propName={propName}
				maxChar={calcMaxChar(maxChar ? maxChar : "sm")}
				isCrypto={isCrypto}
			/>
		)
	}

	return null
}

type Props = {
	credential: ReduxCredentialT
	propName: AccessCredentialPropT
	label: string
	locked: boolean
	visible: boolean
	maxChar?: CharSizesT
	isCrypto?: boolean
}

export default CredentialProp
