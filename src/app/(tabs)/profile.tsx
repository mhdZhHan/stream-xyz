import { View, Image, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import EmptyState from "@/src/components/EmptyState"
import VideoCard from "@/src/components/VideoCard"

// lib
import { getUserPosts, logOut } from "@/src/lib/appwrite"
import { useAppwrite } from "@/src/lib/useAppwrite"

// contexts
import { useGlobalContext } from "@/src/context/GlobalProvider"

// types
import { VideoType } from "@/src/types"

// assets
import { icons } from "@/src/constants"
import InfoBox from "@/src/components/InfoBox"
import { router } from "expo-router"

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext()
	const { data: posts, refetch } = useAppwrite<VideoType>(() =>
		getUserPosts(user?.$id as string)
	)

	const logout = async () => {
		await logOut()
		setUser(null)
		setIsLoggedIn(false)

		router.replace("/login")
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id.toString()}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListEmptyComponent={
					<EmptyState
						title="No Videos Found"
						subTitle="No videos found for this search query"
					/>
				}
				ListHeaderComponent={
					<View className="w-full justify-center items-center mt-6 mb-12 px-4">
						<TouchableOpacity
							className="w-full items-end mb-10"
							onPress={logout}
						>
							<Image
								source={icons.logout}
								resizeMode="contain"
								className="w-6 h-6"
							/>
						</TouchableOpacity>

						<View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
							<Image
								source={{ uri: user?.avatar }}
								resizeMode="cover"
								className="w-[90%] h-[90%] rounded-lg"
							/>
						</View>

						<InfoBox
							title={user?.username as string}
							containerStyle="mt-5"
							titleStyles="text-lg"
						/>

						<View className="mt-5 flex-row">
							<InfoBox
								title={posts.length.toString() || 0 + ""}
								subtitle="Posts"
								containerStyle="mr-10"
								titleStyles="text-xl"
							/>
							<InfoBox
								title="3.1k"
								subtitle="Followers"
								titleStyles="text-xl"
							/>
						</View>
					</View>
				}
			/>
		</SafeAreaView>
	)
}

export default Profile
