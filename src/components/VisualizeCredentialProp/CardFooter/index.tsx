import { FC } from "react"

import { Divider, AccordionActions, Button } from "@material-ui/core"

import CopyText from "../../CopyText"

type Props = {
	textToCopy: string
	label: string
}

const CardFooter: FC<Props> = ({ textToCopy, label }) => {
	return (
		<>
			<Divider />
			<AccordionActions>
				<CopyText body={textToCopy}>
					<Button color="secondary">{label}</Button>
				</CopyText>
			</AccordionActions>
		</>
	)
}

export default CardFooter
