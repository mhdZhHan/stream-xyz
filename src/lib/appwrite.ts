import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
	Storage,
	ImageGravity,
} from "react-native-appwrite"

import { ConfigType, UserType } from "./appwrite.types"
import { VideoType } from "../types"
import { ImagePickerAsset } from "expo-image-picker"

export const config: ConfigType = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.mohammedsh.stream-xyz",
	projectId: "666990760008a383687d",
	databaseId: "6669917c00230df9243a",
	userCollectionId: "666991950006156132d4",
	videoCollectionId: "666991b5002ff4a681a4",
	bucketId: "6669937b0038e5f791dd",
}

const {
	databaseId,
	videoCollectionId,
	bucketId,
} = config

const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

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
	} catch (error) {
		throw new Error(error as string)
	}
}

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.orderDesc("$createdAt")]
		)

		return posts.documents
	} catch (error) {
		throw new Error(error as string)
	}
}

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(7)]
		)

		return posts.documents
	} catch (error) {
		throw new Error(error as string)
	}
}

export const searchPosts = async (query: string) => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.search("title", query)]
		)

		return posts.documents
	} catch (error) {
		throw new Error(error as string)
	}
}

export const getUserPosts = async (userId: string) => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.equal("users", userId)]
		)

		return posts.documents
	} catch (error) {
		throw new Error(error as string)
	}
}

export const logOut = async () => {
	try {
		const session = await account.deleteSession("current")
	} catch (error) {
		throw new Error(error as string)
	}
}

export const getFilePreview = async (fileId: string, type: string) => {
	let fileUrl

	try {
		if (type === "video") {
			fileUrl = storage.getFileView(bucketId, fileId)
		} else if (type === "image") {
			fileUrl = storage.getFilePreview(
				bucketId,
				fileId,
				2000,
				2000,
				ImageGravity.Top,
				100
			)
		} else {
			throw new Error("Invalid file type")
		}

		if (!fileUrl) throw Error

		return fileUrl
	} catch (error) {
		throw new Error(error as string)
	}
}

export const uploadFile = async (file?: ImagePickerAsset, type?: string) => {
	if (!file) return

	const asset = {
		name: file.fileName,
		type: file.mimeType,
		size: file.fileSize,
		uri: file.uri,
	}

	try {
		const uploadedFile = await storage.createFile(
			bucketId,
			ID.unique(),
			asset as { name: string; type: string; size: number; uri: string }
		)

		const fileUrl = await getFilePreview(uploadedFile.$id, type as string)

		return fileUrl
	} catch (error) {
		throw new Error(error as string)
	}
}

export const createVideo = async (form: VideoType) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form?.thumbnail, "image"),
			uploadFile(form?.video, "video"),
		])

		const newPost = await databases.createDocument(
			databaseId,
			videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				users: form.users?.$id,
			}
		)

		console.log("New Post:", newPost)

		return newPost
	} catch (error) {
		throw new Error(error as string)
	}
}
