import { useState, useEffect } from "react"

/************************************************************************************ redux related */
import { showError } from "../../redux/actions/errorHandlingActions"
import {
	clearCredential,
	initializeCredential,
	setDecryptedCredential,
} from "../../redux/actions/credentialActions"
import { toggleLoading, setErrorLoading } from "../../redux/actions/loadingActions"

import { translate } from "../../lang"

/************************************************************************************ misc */
import { findCredential, getCredentials, getUser, putCredential } from "../../misc/indexedDB"
import { maxSlots } from "../../misc/staticData"
import { ApiCallI, CredentialT } from "../../misc/types"
import { useApi } from "../../hooks/useApi"
import { Dispatch } from "redux"

const useCredential = ({ token, lng, dispatch, credentialId }: Params) => {
	const [error, setError] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState("")
	const [id, setId] = useState(0)

	const callApi = useApi

	useEffect(() => {
		// since the url param is a string, we must convert it into a number
		setId(Number(credentialId))

		if (id !== 0) {
			obtainCredential(id)

			dispatch(clearCredential())
		}
	}, [id])

	const obtainCredential = async (id: number) => {
		const data = await findCredential(id)

		if (data === undefined) {
			setError(true)
			setSnackbarMessage(translate("error_messages", lng, 0))

			return
		}
		dispatch(initializeCredential(data))
	}

	const getFromApi = async (decrypted: boolean, agent?: string) => {
		const isAllowedToSee = await checkUser()

		if (!isAllowedToSee) return false
		if (!token) return

		setError(false)
		dispatch(toggleLoading(true))

		const request: ApiCallI = {
			lng,
			token,
			endpoint: "/credential/find/" + id,
			method: "GET",
		}

		return callApi(request).then((response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))

				return false
			}

			dispatch(toggleLoading(false))
			updateCredential(response.data.credential)

			if (decrypted) {
				dispatch(setDecryptedCredential(response.data.credential))
			} else {
				dispatch(initializeCredential(response.data.credential))
			}
			return true
		})
	}

	const checkUser = async () => {
		const user = await getUser()
		const credentials = await getCredentials()

		if (user === undefined || credentials === undefined) {
			// get the user's data from api

			//this false is here just until I implement the api
			return false
		}

		if (user.role === "free" && credentials.length + user.slots_available > maxSlots.free) {
			// the user can't see their credential
			return false
		}

		if (
			user.role === "semi-premium" &&
			credentials.length + user.slots_available > maxSlots.semi_premium
		) {
			// the user also cant se the credential
			return false
		}

		return true
	}

	const updateCredential = async (c: CredentialT) => {
		const data = await putCredential(c)

		if (data === undefined) {
			fatalError()
		}
	}

	const fatalError = () => {
		setError(true)
		setSnackbarMessage(translate("error_messages", lng, 2))
		dispatch(showError(translate("error_messages", lng, 0)))
	}

	return {
		error,
		snackbarMessage,
		getFromApi,
	}
}

type Params = {
	dispatch: Dispatch
	token: null | string
	lng: string
	credentialId: any
}

export default useCredential
