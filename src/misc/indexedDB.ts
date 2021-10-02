import Dexie, { Table } from "dexie"

import { CredentialT, UserT, RecentlySeenT, CompanyT } from "./types"

/**
 * @module IndexedDB
 *
 * @description This module contains all the methods to store, update, and delete stored objects on the IndexedDB. ALL THE METHODS WILL RETURN UNDEFINED IF SOMETHING WENT WRONG.
 */

/**
 * @alias IndexedDB
 *
 * @extends Dexie
 *
 * @description The constructor doesn't receive any params, since its only used to initialize the database
 */

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

/**
 * @module IndexedDB
 *
 * @method dropDatabase
 *
 * @alias dropDatabase
 *
 * @description The method to drop all the items inside the database, & the database itself
 *
 * @returns {void}
 */

export const dropDatabase = (): void => {
	try {
		const db = new PasuNashiDatabase()

		db.delete()
	} catch (error) {
		console.error(error)
		return undefined
	}
}

/**
 * @module IndexedDB
 *
 * @method initiateDB
 *
 * @alias initiateDB
 *
 * @description The method used to prepare the database, and store all the info returned from the api.
 *
 * @param {UserT} user The info of the authenticated user
 *
 * @param {CredentialT[]} credentials All the credentials that the current user has
 *
 * @returns {void}
 */

export const initiateDB = (user: UserT, credentials: CredentialT[]) => {
	dropDatabase()

	//here I use put so when the user login or registers there won't be any error of "same key/id"
	return Promise.all([putCredentials(credentials), putUser(user)])
		.then((data) => {
			if (data[0] === undefined || data[1] === undefined) {
				return undefined
			}
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

/**
 * @module IndexedDB
 *
 * @method getCredentials
 *
 * @description The method to get all the credentials stored in the indexedDB
 *
 * @returns {Promise<CredentialT[]>}
 */

export const getCredentials = (): Promise<CredentialT[] | undefined> => {
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

/**
 * @module IndexedDB
 *
 * @method getUser
 *
 * @description The method to obtain all the user's data
 *
 * @returns {Promise<UserT>}
 */
export const getUser = (): Promise<UserT | undefined> => {
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

/**
 * @module IndexedDB
 *
 * @method putUser
 *
 * @description The method to update user's info. It returns a promise of the updated user object
 *
 * @param {UserT} user The new user to store in the DB
 *
 * @returns {Promise<UserT>}
 */

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

/**
 * @module IndexedDB
 *
 * @method putCredentials
 *
 * @description This method is used to update many credentials at once
 *
 * @param {CredentialT[]} credentials The credentials to update in the DB
 *
 * @returns {Promise<CredentialT[]>}
 */

export const putCredentials = (credentials: CredentialT[]) => {
	const db = new PasuNashiDatabase()

	if (credentials.length === 0) {
		return "0"
	}

	return Promise.resolve(db.credentials.bulkPut(credentials))
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.error(error)

			return undefined
		})
}

/**
 * @module IndexedDB
 *
 * @method putCredential
 *
 * @description This method is used to update a single credential on the DB
 *
 * @param {CredentialT} credential The credential to update in the DB
 *
 * @returns {Promise<CredentialT>}
 */

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

/**
 * @module IndexedDB
 *
 * @method findCredential
 *
 * @description The method to get a specific credential from the DB
 *
 * @param {number} credentialId The id of the credential
 *
 * @returns {Promise<CredentialT>}
 */

export const findCredential = (credentialId: number): Promise<CredentialT | undefined> => {
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

/**
 * @module IndexedDB
 *
 * @method forgetCredential
 *
 * @description The method used to remove one credential from the DB
 *
 * @param {number} credentialId The ID of the credential to delete
 *
 * @returns {number} The id of the credential deleted.
 */

export const forgetCredential = (credentialId: number): Promise<number | undefined> => {
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

/**
 * @module IndexedDB
 *
 * @method getRecentlySeen
 *
 * @description The method used to get the data for the "recently accessed" table. (Recently accessed credentials, basically).
 *
 * @returns {Promise<RecentlySeenT[]>}
 */

export const getRecentlySeen = (): Promise<RecentlySeenT[] | undefined> => {
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

/**
 * @module IndexedDB
 *
 * @method putRecentlySeen
 *
 * @description The method to store the response of the api for the recently accessed credentials
 *
 * @param {RecentlySeenT[]} recent The info returned from the api of the recently accessed credentials
 *
 * @returns {Promise<RecentlySeenT[]>}
 */

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

/**
 * @module IndexedDB
 *
 * @method getCompanies
 *
 * @description The method to get all the options for the user to select when creating a new credential
 *
 * @returns  {Promise<CompanyT[]>}
 */

export const getCompanies = (): Promise<CompanyT[] | undefined> => {
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

/**
 * @module IndexedDB
 *
 * @method putCompanies
 *
 * @description The method to store / update all the options for companies
 *
 * @param {CompanyT[]} companies All the companies to store in the DB
 *
 * @returns {Promise<CompanyT[]>}
 */

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
