import { useState, useEffect } from "react"

import { Dispatch } from "redux"
import {
	initializeCredential,
	setDecryptedCredential,
} from "../../../redux/actions/credentialActions"
import { showError } from "../../../redux/actions/errorHandlingActions"
import { setErrorLoading, toggleLoading } from "../../../redux/actions/loadingActions"

import { findCredential, putCredential } from "../../../misc/indexedDB"
import { ApiCallI, ReduxCredentialT } from "../../../misc/types"

import getUserAgent from "../../../hooks/useUserAgent"
import { useApi } from "../../../hooks/useApi"

import { translate } from "../../../lang"

const useCredentialFunctions = ({ token, dispatch, lng, credential }: Params) => {
	const [locked, setLocked] = useState(true)
	const [visible, setVisible] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [showSnackbar, setShowSnackbar] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState("")

	const callApi = useApi

	useEffect(() => {
		setIsAuthenticated(!locked)

		if (showSnackbar) {
			const timer = setTimeout(() => {
				setShowSnackbar(false)
			}, 12500)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [locked, showSnackbar])

	const obtainCredential = async (id: number) => {
		const data = await findCredential(id)

		if (data === undefined) {
			return undefined
		}

		return data
	}

	const toggleVisibility = () => {
		if (!token) return

		if (!locked && visible) {
			setLocked(true)
		}

		if (!visible) {
			dispatch(toggleLoading(true))

			const request: ApiCallI = {
				lng,
				token,
				method: "POST",
				endpoint: "/auth/grant-access",
				body: {
					accessTo: "credential-data",
					credentialId: credential.id,
					accessingPlatform: "web",
					accessingDevice: getUserAgent(),
				},
			}

			return callApi(request).then((response) => {
				if (response.status !== 200) {
					setShowSnackbar(true)
					setSnackbarMessage(translate("access_denied_message", lng))
					dispatch(setErrorLoading(response.message))
				} else {
					dispatch(toggleLoading(false))
					setVisible(true)
					dispatch(setDecryptedCredential(response.data.decrypted_credential))
				}
			})
		}

		const id = credential.id ? credential.id : 0

		if (id !== 0) {
			obtainCredential(id).then((credentialDB: any) => {
				if (credentialDB) {
					setVisible(false)
					dispatch(initializeCredential(credentialDB))
				} else {
					setSnackbarMessage(translate("error_messages", lng, 3))
					setShowSnackbar(true)
				}
			})
		}
	}

	const toggleLock = () => {
		if (!token) return

		if (!locked) {
			updateCredential(credential)

			return
		}

		dispatch(toggleLoading(true))

		const request: ApiCallI = {
			lng,
			token,
			method: "POST",
			endpoint: "/auth/grant-access",
			body: {
				accessTo: "credential-data",
				credentialId: credential.id,
				accessingPlatform: "web",
				accessingDevice: getUserAgent(),
			},
		}

		callApi(request).then((response) => {
			if (response.status !== 200) {
				setShowSnackbar(true)
				setSnackbarMessage(translate("access_denied_message", lng))
				dispatch(setErrorLoading(response.message))
			} else {
				dispatch(toggleLoading(false))

				if (!visible && locked) {
					setVisible(true)
				}

				setLocked(false)
				setIsAuthenticated(true)
				dispatch(setDecryptedCredential(response.data.decrypted_credential))
			}
		})
	}

	const updateCredential = (credential: ReduxCredentialT) => {
		if (!token) return

		const request: ApiCallI = {
			lng,
			method: "PUT",
			endpoint: "/credential/update/" + credential.id,
			body: {
				...credential,
				accessing_device: getUserAgent(),
				accessing_platform: "web",
			},
			token,
		}

		dispatch(toggleLoading(true))

		callApi(request).then(async (response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))
				return
			}

			const updatedCredential = await putCredential(response.data.credential)

			if (updatedCredential === undefined) {
				dispatch(showError(translate("error_messages", lng, 0)))

				return
			}

			dispatch(initializeCredential(response.data.credential))
			dispatch(toggleLoading(false))
			setLocked(true)
			setVisible(false)
		})
	}

	return {
		locked,
		visible,
		isAuthenticated,
		showSnackbar,
		snackbarMessage,
		toggleVisibility,
		toggleLock,
	}
}

type Params = {
	token: null | string
	lng: string
	credential: ReduxCredentialT
	dispatch: Dispatch
}

export default useCredentialFunctions
