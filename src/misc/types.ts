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
	user: {
		firstName: string
		lastName: string
	}
	date: string
	opinion: {
		body: string
		isRating: boolean
		rating?: number
	}
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
	email?: {
		opening: string
		char_count: number
		ending: string
		email?: string
	}
	password?: {
		char_count: number
		password?: string
	}
	username?: {
		char_count: number
		username?: string
	}
	phone_number?: {
		opening: string
		char_count: number
		ending: string
		phone_number?: string
	}
	security_question_answer?: {
		security_question: string
		security_answer: string
	}
	security_codes?: {
		unique_security_code: string | null
		multiple_security_codes: string | null
		multiple_code_length: number
		crypto_currency_access_code: string | null
		crypto_code_length: number | null
	}
	created_at: string
	updated_at: string
}

export type ReduxCredentialT = {
	id?: number
	company_id?: number
	company_name?: string
	description?: string
	user_name?: string
	email?: string
	password?: string
	username?: string
	phone_number?: string
	security_question?: string
	security_answer?: string
	unique_security_code?: string
	multiple_security_code?: string | string[]
	crypto_currency_access_codes?: string | string[]
}

export type AccessCredentialPropT =
	| "id"
	| "company_id"
	| "company_name"
	| "description"
	| "user_name"
	| "email"
	| "password"
	| "username"
	| "phone_number"
	| "security_question"
	| "security_answer"
	| "unique_security_code"
	| "multiple_security_code"
	| "crypto_currency_access_codes"

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
	name: string
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
