import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
} from "react-native-appwrite"

import { ConfigType, UserType } from "./appwrite.types"

export const config: ConfigType = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.mohammedsh.stream-xyz",
	projectId: "666990760008a383687d",
	databaseId: "6669917c00230df9243a",
	userCollectionId: "666991950006156132d4",
	videoCollectionId: "666991b5002ff4a681a4",
	bucketId: "6669937b0038e5f791dd",
}

const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)

export const createUser = async ({ email, password, username }: UserType) => {
	// Register User
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)

		if (!newAccount) throw new Error()

		const avatarUrl = avatar.getInitials(username)

		await signIn(email, password)

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		)

		return newUser
	} catch (error) {
		console.log("ERROR", (error as Error).message)
		throw new Error(error as string)
	}
}

export const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(
			email,
			password
		)

		console.log("Hello", session)

		return session
	} catch (error) {
		console.log(error)
		throw new Error(error as string)
	}
}

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get()
		if (!currentAccount) throw Error

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		)

		if (!currentUser) throw Error

		return currentUser.documents[0]
	} catch (error) {}
}
