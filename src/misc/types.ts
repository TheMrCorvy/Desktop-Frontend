export type CredentialT = {
	id: number
	user_id: number
	company_id: number | null
	company_name: string
	logo_url: string | null
	description?: string
	last_seen: string
	recently_seen: boolean | string
	user_name: string | null
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
		unique_security_code?: string
		multiple_security_codes?: string[]
		crypto_currency_access_code?: string[]
	}
	created_at: string
	updated_at: string
}
