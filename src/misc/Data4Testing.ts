import { OpinionCardT } from "../components/OpinionCard"
import { UserT } from "./ajaxManager"
import { CredentialT } from "./types"
import { RecentlySeenT } from "../components/Sections/RecentAccessTable"

export const suggestion4Testing: OpinionCardT[] = [
	{
		user: {
			firstName: "Name 1",
			lastName: "Example",
		},
		date: "September 14, 2016",
		opinion: {
			body:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
			isRating: false,
		},
	},
]

export const rating4Testing: OpinionCardT[] = [
	{
		user: {
			firstName: "Name 1",
			lastName: "Example",
		},
		date: "September 14, 2016",
		opinion: {
			body:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem culpa optio animi deleniti ipsum dolorum voluptatem vel iste saepe ad sed maiores cupiditate, debitis nihil atque facilis minus! Alias, voluptatum.",
			isRating: true,
			rating: 2.5,
		},
	},
]

export const user4Testing: UserT = {
	name: "Gonzalo",
	email: "email_1@gmail.com",
	recovery_email: "email_2@gmail.com",
	phone_number: "+54 011 1234-5678",
	slots_available: 2,
	role: "admin",
	id: 100,
	anti_fishing_secret: "@Leonard1618",
	invitation_code: "AJFV8S67B4JSA8",
}

export const secretKey4Testing = "DCRMALCXPEZOFKZH"

export const credential4Testing: CredentialT[] = [
	{
		id: 1,
		user_id: 1,
		company_id: null,
		company_name: "test",
		logo_url: null,
		description: "roses are red, violets are blue, lorem ipsum this is a description",
		last_seen: "2021-02-15 17:32:23",
		recently_seen: "",
		user_name: "example name",
		char_count: 12,
		email: {
			opening: "fa",
			char_count: 7,
			ending: "@gmail.com",
			email: "fake_mail@gmail.com",
		},
		password: {
			char_count: 9,
			password: "123456789",
		},
		username: {
			char_count: 12,
			username: "xXUserNameXx",
		},
		phone_number: {
			opening: "+54",
			char_count: 7,
			ending: "31",
			phone_number: "+54-011-5555-5531",
		},
		security_question_answer: {
			security_question: "what is the meaning of life?",
			security_answer: "42",
		},
		security_codes: {
			unique_security_code: "D7WK29JDU8",
			multiple_security_codes:
				" D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 ",
			multiple_code_length: 11,
			crypto_currency_access_code:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit Eaque odio accusamus cumque nemo veniam? Perferendis consequatur incidunt fugiat delectus reiciendis atque Ipsam excepturi molestiae quasi ratione id veniam pariatur laborum",
			crypto_code_length: 30,
		},
		created_at: "2021-02-15 17:32:23",
		updated_at: "2021-02-15 17:32:23",
	},
	{
		id: 2,
		user_id: 1,
		company_id: 3,
		company_name: "test 2",
		logo_url: "https://i.pinimg.com/originals/20/be/24/20be24eb7d0ef02c2b227d2b6f172e0d.jpg",
		description: "I know the last description didn't rhyme",
		last_seen: "2021-02-15 17:32:23",
		recently_seen: true,
		user_name: null,
		char_count: null,
		email: {
			opening: "fa",
			char_count: 7,
			ending: "@gmail.com",
			email: "fake_mail@gmail.com",
		},
		password: {
			char_count: 9,
			password: "123456789",
		},
		username: {
			char_count: 12,
			username: "xXUserNameXx",
		},
		phone_number: {
			opening: "+54",
			char_count: 7,
			ending: "31",
			phone_number: "+54-011-5555-5531",
		},
		security_question_answer: {
			security_question: "what is the meaning of life?",
			security_answer: "42",
		},
		security_codes: {
			unique_security_code: "D7WK29JDU8",
			multiple_security_codes: null,
			multiple_code_length: 0,
			crypto_currency_access_code:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit Eaque odio accusamus cumque nemo veniam? Perferendis consequatur incidunt fugiat delectus reiciendis atque Ipsam excepturi molestiae quasi ratione id veniam pariatur laborum",
			crypto_code_length: 30,
		},
		created_at: "2021-02-15 17:32:23",
		updated_at: "2021-02-15 17:32:23",
	},
	{
		id: 3,
		user_id: 1,
		company_id: 5,
		company_name: "test 3",
		logo_url: null,
		last_seen: "2021-02-15 17:32:23",
		recently_seen: true,
		user_name: "example name 2",
		char_count: 14,
		email: {
			opening: "fa",
			char_count: 7,
			ending: "@gmail.com",
			email: "fake_mail@gmail.com",
		},
		password: {
			char_count: 9,
			password: "123456789",
		},
		username: {
			char_count: 12,
			username: "xXUserNameXx",
		},
		phone_number: {
			opening: "+54",
			char_count: 7,
			ending: "31",
			phone_number: "+54-011-5555-5531",
		},
		security_question_answer: {
			security_question: "what is the meaning of life?",
			security_answer: "42",
		},
		security_codes: {
			unique_security_code: "D7WK29JDU8",
			multiple_security_codes:
				" D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 D7WK29JDU8 ",
			multiple_code_length: 11,
			crypto_currency_access_code:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit Eaque odio accusamus cumque nemo veniam? Perferendis consequatur incidunt fugiat delectus reiciendis atque Ipsam excepturi molestiae quasi ratione id veniam pariatur laborum",
			crypto_code_length: 30,
		},
		created_at: "2021-02-15 17:32:23",
		updated_at: "2021-02-15 17:32:23",
	},
]

export const recentlySeen4Testing: RecentlySeenT[] = [
	{
		name: "test 1",
		last_seen: "2021-02-23 17:32:23",
		id: 1,
		created_at: "2021-02-15 17:32:23",
		updated_at: "2021-02-15 17:32:23",
		accessing_device: "Macintosh; Intel Mac OS X 11_2_3",
		accessing_platform: "web",
	},
]
