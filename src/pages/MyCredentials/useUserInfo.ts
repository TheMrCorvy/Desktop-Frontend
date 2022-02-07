import { useState, useEffect } from "react"

import { Dispatch } from "redux"

import { showError } from "../../redux/actions/errorHandlingActions"

import { CredentialT, UserT } from "../../misc/types"
import { getCredentials, getUser } from "../../misc/indexedDB"

import { translate } from "../../lang"

import { By, Direction } from "../../components/UI-Components/OrderBar"

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

	const orderBy = (sort: Sort) => {
		// the [...credentials] is very important, since a sorted array its still the same,
		// and thus react won't update state after re order the array.
		// so we need to copy it, creating a new array in the proces, then sorting it, and the finally update the state
		const credentialsSorted = [...credentials].sort((prev, next) => {
			if (prev[sort.by] > next[sort.by]) {
				return 1 * sort.direction
			}

			if (prev[sort.by] < next[sort.by]) {
				return -1 * sort.direction
			}

			return 0
		})

		setCredentials(credentialsSorted)
	}

	return {
		user,
		credentials,
		setCredentials,
		orderBy,
	}
}

type Params = {
	lng: string
	dispatch: Dispatch
}

type Sort = {
	by: By
	direction: Direction
}

export default useUserInfo
