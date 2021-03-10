import { OpinionCardT } from "../Sections/Opinions/OpinionCard"

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
