import { OpinionCardT } from "../components/Sections/Opinions/OpinionCard"
import { UserT } from "../redux/types"
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
	mainEmail: "email_1@gmail.com",
	recoveryEmail: "email_2@gmail.com",
	phone: "+54 011 1234-5678",
	availableSlots: 4,
	role: "free",
}

export const credential4Testing: CredentialT[] = [
	{
		name: "test",
		avatar: null,
		recentlySeen: true,
		id: 1,
	},
]
