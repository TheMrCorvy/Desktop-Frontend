import Dexie, { Table } from "dexie"

import { CredentialT, UserT, RecentlySeenT, CompanyT } from "./types"

class PasuNashiDatabase extends Dexie {
	users!: Table<UserT>
	credentials!: Table<CredentialT>
	recently_seen!: Table<RecentlySeenT>
	companies!: Table<CompanyT>

	constructor() {
		super("PasuNashi")
		this.version(1).stores({
			users: "id,name,mainEmail,recoveryEmail,phone,availableSlots,role",
			credentials:
				"id,user_id,company_id,company_name,logo_url,description,last_seen,recently_seen,email,password,username,phone_number,security_question_answer,security_codes,created_at,updated_at",
			recently_seen:
				"id,name,last_seen,created_at,updated_at,accessing_device,accessing_platform",
			companies: "id,name,url_logo",
		})
	}
}

export const dropDatabase = (): void => {
	try {
		const db = new PasuNashiDatabase()

		db.delete()
	} catch (error) {
		console.error(error)
		return undefined
	}
}

export const initiateDB = (user: UserT, credentials: CredentialT[]) => {
	//here I use put so when the user login or registers there won't be any error of "same key/id"
	return Promise.all([putCredentials(credentials), putUser(user)])
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const getCredentials = () => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.credentials.toArray())
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const getUser = () => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.users.orderBy("id").first())
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putUser = (user: UserT) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.users.put(user))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putCredentials = (credentials: CredentialT[]) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.credentials.bulkPut(credentials))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putCredential = (credential: CredentialT) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.credentials.put(credential))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const findCredential = (credentialId: number) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.credentials.get(credentialId))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const forgetCredential = (credentialId: number) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.credentials.where("id").equals(credentialId).delete())
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const getRecentlySeen = () => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.recently_seen.toArray())
		.then((data) => {
			if (data.length === 0) {
				return undefined
			} else {
				return data
			}
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putRecentlySeen = (recent: RecentlySeenT[]) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.recently_seen.bulkPut(recent))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const getCompanies = () => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.companies.toArray())
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putCompanies = (companies: CompanyT[]) => {
	const db = new PasuNashiDatabase()

	return Promise.resolve(db.companies.bulkPut(companies))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}
