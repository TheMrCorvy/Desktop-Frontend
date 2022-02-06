import { useEffect, useState } from "react"

import { useApi } from "../../../../hooks/useApi"

const useUserData = ({ lng, token, testing }: Params) => {
	const [userData, setUserData] = useState<UserData>({
		email: "",
		secretKey: "",
	})

	const callApi = useApi

	useEffect(() => {
		if (testing) {
			setUserData({
				email: "mr.corvy@gmail.com",
				secretKey: "DCRMALCXPEZOFKZH",
			})

			return
		}

		callApi({
			lng,
			endpoint: "/auth/refresh-2fa-secret",
			method: "GET",
			token,
		}).then((response) => {
			if (response.status === 200) {
				setUserData({
					email: response.data.email,
					secretKey: response.data.secret,
				})
			} else {
				console.error(response)
			}
		})
	}, [])

	return { userData }
}

type Params = {
	token: undefined | string
	lng: string
	testing?: boolean
}

type UserData = {
	email: string
	secretKey: string
	error?: any
}

export default useUserData
