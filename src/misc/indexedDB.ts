import Dexie, { Table } from "dexie"
import { CredentialT } from "../components/CredentialCard"
import { UserT } from "./ajaxManager"

class PasuSewaDatabase extends Dexie {
	users!: Table<UserT>
	credentials!: Table<CredentialT>

	constructor() {
		super("PasuSewa")
		this.version(1).stores({
			users: "id,name,mainEmail,RecoveryEmail,phone,availableSlots,role",
			credentials: "id,name,avatar,recentlySeen",
		})
	}
}

export const initiateDB = async (user: UserT, credentials: CredentialT[]) => {
	try {
		const db = new PasuSewaDatabase()

		//here I use put so when the user login or registers there won't be any error of "same key/id"
		const userStored = await db.users.put(user)

		const credentialsStored = await db.credentials.bulkPut(credentials)

		return { userStored, credentialsStored }
	} catch (error) {
		return {
			error,
			failed: true,
		}
	}
}
