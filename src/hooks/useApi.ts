import { ApiCallI, ApiResponseT } from "../misc/types"

export const useApi = async (params: ApiCallI): Promise<ApiResponseT> => {
	const { lng, endpoint, method, body, token } = params

	const localUrl = "http://localhost:8000/api"

	const productionUrl = "https://pasunashi-backend.herokuapp.com/api"

	const { REACT_APP_USE_LOCAL_API } = process.env

	const baseUri = REACT_APP_USE_LOCAL_API ? localUrl : productionUrl

	return await fetch(baseUri + endpoint, {
		method,
		headers: new Headers({
			"Content-Type": "application/json",
			Accept: "application/json",
			"Accept-Language": lng,
			Authorization: token ? "Bearer " + token : "",
		}),
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((response) => response)
		.catch((response) => {
			console.error(response)

			return response
		})
}
