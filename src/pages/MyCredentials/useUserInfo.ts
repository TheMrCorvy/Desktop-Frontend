import { useState, useEffect } from "react"

import { Dispatch } from "redux"

import { showError } from "../../redux/actions/errorHandlingActions"

import { CredentialT, UserT } from "../../misc/types"
import { getCredentials, getUser } from "../../misc/indexedDB"

import { translate } from "../../lang"

const useUserInfo = ({ lng, dispatch }: Params) => {
	const [user, setUser] = useState<UserT | null>(null)
	const [credentials, setCredentials] = useState<CredentialT[]>([])

	useEffect(() => {
		obtainFromDB("credentials")
		obtainFromDB("user")
	}, [])

	const obtainFromDB = async (option: string) => {
		let data: any

		option === "user" ? (data = await getUser()) : (data = await getCredentials())

		if (data === undefined) {
			dispatch(showError(translate("error_messages", lng, 0)))

			return
		}

		option === "user" ? setUser(data) : setCredentials(data)
	}

	return {
		user,
		credentials,
		setCredentials,
	}
}

type Params = {
	lng: string
	dispatch: Dispatch
}

export default useUserInfo
