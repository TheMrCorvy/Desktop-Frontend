import Dexie, { Table } from "dexie"
import { CredentialT } from "../components/CredentialCard"
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
			credentials: "id,name,avatar,recentlySeen",
		})
	}
}

export const dropDatabase = (): void | DBErrorT => {
	try {
		const db = new PasuSewaDatabase()

		db.delete()
	} catch (error) {
		return { failed: true, error }
	}
}

export const initiateDB = async (user: UserT, credentials: CredentialT[]) => {
	try {
		//here I use put so when the user login or registers there won't be any error of "same key/id"
		const userStored = await putUser(user)

		const credentialsStored = await putCredentials(credentials)

		return { userStored, credentialsStored }
	} catch (error) {
		return { failed: true, error }
	}
}

export const getCredentials = async () => {
	try {
		const db = new PasuSewaDatabase()

		const credentials = await db.credentials.toArray()

		const userData = await db.users.orderBy("id").first()

		return { userData, credentials }
	} catch (error) {
		return { failed: true, error }
	}
}

export const getUser = async () => {
	try {
		const db = new PasuSewaDatabase()

		return await db.users.orderBy("id").first()
	} catch (error) {
		return { failed: true, error }
	}
}

export const putUser = async (user: UserT) => {
	try {
		const db = new PasuSewaDatabase()

		return await db.users.put(user)
	} catch (error) {
		return { failed: true, error }
	}
}

export const putCredentials = async (credentials: CredentialT[]) => {
	try {
		const db = new PasuSewaDatabase()

		return await db.credentials.bulkPut(credentials)
	} catch (error) {
		return { failed: true, error }
	}
}
