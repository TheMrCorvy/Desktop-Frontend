import { useEffect, useState } from "react"

import { Dispatch } from "redux"
import { showError } from "../../../redux/actions/errorHandlingActions"
import { translate } from "../../../lang"

import { getUser } from "../../../misc/indexedDB"

const useUser = ({ dispatch, lng, testing }: Params) => {
	const [userRole, setUserRole] = useState("")

	useEffect(() => {
		obtainUser()
	}, [])

	const obtainUser = async () => {
		if (testing) {
			setUserRole("premium")

			return
		}

		let user = await getUser()

		if (user === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		setUserRole(user.role)
	}

	return {
		userRole,
	}
}

type Params = {
	dispatch: Dispatch
	lng: string
	testing: boolean | undefined
}

export default useUser
