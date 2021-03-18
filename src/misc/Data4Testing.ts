import { OpinionCardT } from "../components/Sections/Opinions/OpinionCard"
import { UserT } from "./ajaxManager"
import { CredentialT } from "../components/CredentialCard"

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
	slots_available: 3,
	role: "premium",
	id: 100,
	anti_fishing_secret: "@Leonard1618",
}

export const secretKey4Testing = "DCRMALCXPEZOFKZH"

export const credential4Testing: CredentialT[] = [
	{
		name: "test 1",
		avatar: null,
		recently_seen: true,
		id: 1,
		created_at: "some date 1",
		updated_at: "some date 2",
	},
	{
		name: "test 2",
		avatar: null,
		recently_seen: false,
		id: 2,
		created_at: "some date 3",
		updated_at: "some date 4",
	},
]
