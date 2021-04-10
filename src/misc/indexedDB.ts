import Dexie, { Table } from "dexie"
import { CredentialT } from "./types"
import { UserT } from "./ajaxManager"

export type DBErrorT = {
	failed: boolean
	error: any
}

class PasuSewaDatabase extends Dexie {
	users!: Table<UserT>
	credentials!: Table<CredentialT>

	constructor() {
		super("PasuSewa")
		this.version(1).stores({
			users: "id,name,mainEmail,recoveryEmail,phone,availableSlots,role",
			credentials:
				"id,user_id,company_id,company_name,logo_url,description,last_seen,recently_seen,email,password,username,phone_number,security_question_answer,security_codes,created_at,updated_at",
		})
	}
}

export const dropDatabase = (): void | DBErrorT => {
	try {
		const db = new PasuSewaDatabase()

		db.delete()
	} catch (error) {
		console.error(error)
		return undefined
	}
}

export const initiateDB = async (user: UserT, credentials: CredentialT[]) => {
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

export const getCredentials = async () => {
	const db = new PasuSewaDatabase()

	return Promise.all([db.credentials.toArray()])
		.then((data) => {
			return data[0]
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const getUser = async () => {
	const db = new PasuSewaDatabase()

	return Promise.all([db.users.orderBy("id").first()])
		.then((data) => {
			return data[0]
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putUser = async (user: UserT) => {
	const db = new PasuSewaDatabase()

	return Promise.all([db.users.put(user)])
		.then((data) => {
			return data[0]
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putCredentials = async (credentials: CredentialT[]) => {
	const db = new PasuSewaDatabase()

	return Promise.all([db.credentials.bulkPut(credentials)])
		.then((data) => {
			return data[0]
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const putCredential = async (credential: CredentialT) => {
	const db = new PasuSewaDatabase()

	return Promise.all([db.credentials.put(credential)])
		.then((data) => {
			return data[0]
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

export const findCredential = async (credentialId: number) => {
	const db = new PasuSewaDatabase()

	return Promise.all([db.credentials.get(credentialId)])
		.then((data) => {
			return data[0]
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}
