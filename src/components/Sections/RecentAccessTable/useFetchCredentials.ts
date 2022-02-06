import { useState, useEffect } from "react"

import { Dispatch } from "redux"
import { setErrorLoading } from "../../../redux/actions/loadingActions"

import { recentlySeen4Testing } from "../../../misc/Data4Testing"
import { getRecentlySeen, putRecentlySeen } from "../../../misc/indexedDB"
import { ApiCallI, RecentlySeenT } from "../../../misc/types"

import { useApi } from "../../../hooks/useApi"

const useFetchCredentials = ({ token, lng, dispatch, testing }: Params) => {
	const [credentials, setCredentials] = useState<RecentlySeenT[]>([])
	const [loading, setLoading] = useState(true)

	const callApi = useApi

	useEffect(() => {
		if (!testing) {
			obtainRecentAccess()
		} else {
			setCredentials(recentlySeen4Testing)
			setLoading(false)
		}
	}, [])

	const obtainRecentAccess = async () => {
		let data: any

		data = await getRecentlySeen()

		if (data === undefined) {
			return getFromApi()
		}

		setCredentials(data)
		setLoading(false)
	}

	const getFromApi = async () => {
		if (!token) return

		const request: ApiCallI = {
			lng,
			method: "GET",
			endpoint: "/credential/get-recently-seen",
			token,
		}

		callApi(request).then((response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))

				return
			}

			setCredentials(response.data.recently_seen)
			putRecentlySeen(response.data.recently_seen)
			setLoading(false)
		})
	}

	return { credentials, loading }
}

type Params = {
	token: null | string
	lng: string
	dispatch: Dispatch
	testing?: boolean
}

export default useFetchCredentials
