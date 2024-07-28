import { useState } from "react"
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ResizeMode, Video } from "expo-av"
import * as ImagePicker from "expo-image-picker"
import { icons } from "@/src/constants"

import { createVideo } from "@/src/lib/appwrite"

// components
import FormField from "@/src/components/FormField"
import CustomButton from "@/src/components/CustomButton"
import { router } from "expo-router"

// type
import { VideoType } from "@/src/types"
import { useGlobalContext } from "@/src/context/GlobalProvider"

const Create = () => {
	const [uploading, setUploading] = useState(false)
	const [form, setForm] = useState<VideoType>({} as VideoType)

	const { user } = useGlobalContext()

	const openPicker = async (selectType: "image" | "video") => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes:
				selectType === "image"
					? ImagePicker.MediaTypeOptions.Images
					: ImagePicker.MediaTypeOptions.Videos,
			// allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			if (selectType === "image") {
				setForm({ ...form, thumbnail: result.assets[0] })
			}

			if (selectType === "video") {
				setForm({ ...form, video: result.assets[0] })
			}
		}
	}

	const submit = async () => {
		if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
			return Alert.alert("Please fill in all the fields")
		}

		setUploading(true)

		try {
			await createVideo({ ...form, users: user })

			Alert.alert("Post uploaded successfully")
			router.push("/home")
		} catch (error) {
			Alert.alert("Error", error as string)
		} finally {
			setForm({} as VideoType)
			setUploading(false)
		}
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView className="px-4 my-6">
				<Text className="text-2xl text-white font-psemibold">
					Upload video
				</Text>

				<FormField
					title="Video Title"
					value={form.title as string}
					placeholder="Give your video a catch title..."
					otherStyles="mt-10"
					onChangeText={(text) => setForm({ ...form, title: text })}
				/>

				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Upload Video
					</Text>

					<TouchableOpacity onPress={() => openPicker("video")}>
						{form.video ? (
							<Video
								source={{ uri: form.video.uri }}
								className="w-full h-64 rounded-2xl"
								resizeMode={ResizeMode.COVER}
							/>
						) : (
							<View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
								<View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
									<Image
										source={icons.upload}
										resizeMode="contain"
										className="w-1/2 h-1/2"
									/>
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Thumbnail Image
					</Text>

					<TouchableOpacity onPress={() => openPicker("image")}>
						{form.thumbnail ? (
							<Image
								source={{ uri: form.thumbnail.uri }}
								resizeMode="cover"
								className="w-full h-64 rounded-2xl"
							/>
						) : (
							<View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
								<Image
									source={icons.upload}
									resizeMode="contain"
									className="w-5 h-5"
								/>
								<Text className="text-sm text-gray-100 font-pmedium">
									Choose a file
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<FormField
					title="AI Prompt"
					value={form.prompt as string}
					placeholder="The prompt you used to create this video"
					otherStyles="mt-7"
					onChangeText={(text) => setForm({ ...form, prompt: text })}
				/>

				<CustomButton
					title="Submit & Publish"
					handlePress={submit}
					containerStyles="mt-7"
					isLoading={uploading}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Create
