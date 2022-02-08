import { useState, useEffect } from "react"

import { clearCredential } from "../../../redux/actions/credentialActions"
import { Dispatch } from "redux"
import { setErrorLoading } from "../../../redux/actions/loadingActions"

import { CompanyT, ApiCallI } from "../../../misc/types"

import { getCompanies, putCompanies } from "../../../misc/indexedDB"

import { useApi } from "../../../hooks/useApi"

const useCompanies = ({ lng, dispatch }: Params) => {
	const [companies, setCompanies] = useState<CompanyT[]>([
		{
			id: 0,
			name: "",
			url_logo: "",
		},
	])

	const callApi = useApi

	useEffect(() => {
		obtainCompanies()

		dispatch(clearCredential())
	}, [])

	const obtainCompanies = async () => {
		const data = await getCompanies()

		if (data === undefined || data.length === 0) {
			getFromApi()

			return
		}

		setCompanies(data)
	}

	const getFromApi = () => {
		const request: ApiCallI = {
			lng,
			method: "GET",
			endpoint: "/companies/index",
		}

		callApi(request).then(async (response) => {
			if (response.status !== 200) {
				dispatch(setErrorLoading(response.message))
			}

			await putCompanies(response.data.companies)

			setCompanies(response.data.companies)
		})
	}

	return {
		companies,
	}
}

type Params = {
	lng: string
	dispatch: Dispatch
}

export default useCompanies
