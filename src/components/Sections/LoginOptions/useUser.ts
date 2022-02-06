import { useEffect, useState } from "react"

import { getUser } from "../../../misc/indexedDB"

import { UserT } from "../../../misc/types"

const useUser = (token: string | null) => {
	const [user, setUser] = useState<undefined | UserT>(undefined)

	useEffect(() => {
		if (token) {
			obtainFromDB()
		}
	}, [])

	const obtainFromDB = async () => {
		let data: any = await getUser()

		if (data !== undefined) {
			setUser(data)
		}
	}

	return { user }
}

export default useUser
