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

/******************************************************************************** credential card */
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
		crypto_code_length: number
	}
	created_at: string
	updated_at: string
}

/******************************************************************************** user */
export type UserT = {
	name: string
	email: string
	recovery_email: string
	slots_available: number
	role: "free" | "semi-premium" | "premium" | "admin"
	id: number
	phone_number: string
	anti_fishing_secret: string
	invitation_code: string
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
