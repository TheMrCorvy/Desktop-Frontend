import { LazyExoticComponent } from "react"
import { IconName } from "@fortawesome/fontawesome-svg-core"

/******************************************************************************** routes */
export type RouteT = {
	component: LazyExoticComponent<any>
	requiresAuth: boolean
	path: string
	guestOnly?: boolean
}

/******************************************************************************** opinion card */
export type OpinionCardT = {
	user_name: string
	body: string
	id: number
	rating: number
	type: boolean
}

/******************************************************************************** pricing card */
export type ListItemT = {
	icon: IconName
	text: string
}

export type PricingCardT = {
	title: string
	subtitle: string
	cardElevation: number
	listItems: ListItemT[]
	buttonText: string
}

/******************************************************************************** credential */
export type CredentialT = {
	id: number
	user_id: number
	company_id: number | null
	company_name: string
	url_logo: string | null
	description?: string
	last_seen: string
	recently_seen: boolean | string
	user_name: string | null
	char_count: number | null
	email: null | {
		opening: string
		char_count: number
		ending: string
		email?: string
	}
	password: null | {
		char_count: number
		password?: string
	}
	username: null | {
		char_count: number
		username?: string
	}
	phone_number: null | {
		opening: string
		char_count: number
		ending: string
		phone_number?: string
	}
	security_question_answer: null | {
		security_question: string
		security_answer: string
	}
	security_code: null | {
		unique_code: string | null
		unique_code_length: number | null
		multiple_codes: string | null
		multiple_codes_length: number
		crypto_codes: string | null
		crypto_codes_length: number | null
	}
	created_at: string
	updated_at: string
}

export type ReduxCredentialT = {
	id?: number
	user_id?: number
	company_id?: number | null
	company_name?: string
	description?: string
	user_name?: string
	char_count?: null | string
	email?: string
	password?: string
	username?: string
	phone_number?: string
	security_question?: string
	security_answer?: string
	unique_code?: string
	unique_code_length?: number
	multiple_codes?: string[]
	multiple_codes_length?: number
	crypto_codes?: string[]
	crypto_codes_length?: number
	created_at?: string
	updated_at?: string
	last_seen?: string
}

export type AccessCredentialPropT =
	| "id"
	| "company_id"
	| "company_name"
	| "description"
	| "user_name"
	| "char_count"
	| "email"
	| "password"
	| "username"
	| "phone_number"
	| "security_question"
	| "security_answer"
	| "unique_code"
	| "unique_code_length"
	| "multiple_codes"
	| "multiple_codes_length"
	| "crypto_codes"
	| "crypto_codes_length"

export type CredentialPropValueT = number | string | string[]

/******************************************************************************** user */
export type UserT = {
	id: number
	name: string
	email: string
	recovery_email: string
	phone_number: string
	slots_available: number
	role: "free" | "semi-premium" | "premium" | "admin"
	anti_fishing_secret: string
	invitation_code: string
	security_access_code: string
	preferred_lang: string
}

/******************************************************************************** recommended apps */
export type RecommendedAppsT = {
	appName: string
	bodyText: string
	linkAppleStore: string
	linkPlayStore: string
	linkOfficialPage?: string
}

/******************************************************************************** recently seen */
export type RecentlySeenT = {
	company_name: string
	last_seen: string
	id: 1
	created_at: string
	updated_at: string
	accessing_device: string
	accessing_platform: string
}

/******************************************************************************** ajax */
export type ApiResponseLoginT = {
	token: string
	user_data: UserT
	user_credentials: CredentialT[]
	isAuthorized?: boolean
}

export type ApiResponseGetCredentialsT = {
	slots_available: number
	user_credentials: CredentialT[]
}

export interface ApiCallI {
	lng: string
	endpoint: string
	method: "GET" | "POST" | "PUT" | "DELETE"
	body?: object
	token?: string
}

interface ApiSuccessResponse {
	message: string
	data: any
	status: number
}

interface ApiErrorResponse {
	message: string
	status: number
	data: {
		errors: any
	}
	request: null | any
}

export type ApiResponseT = ApiSuccessResponse | ApiErrorResponse

/******************************************************************************** coinbase charge */
export type CoinbaseChargeT = {
	name: string
	description: string
	local_price: {
		amount: number
		currency: string
	}
	pricing_type: string
}

/******************************************************************************** company type */
export type CompanyT = {
	id: number
	name: string
	url_logo: string
}

/******************************************************************************** maximum characters per str */
export type CharSizesT = "xs" | "sm" | "md" | "lg" | "xl"
