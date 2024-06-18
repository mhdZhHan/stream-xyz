import { useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import SearchInput from "@/src/components/SearchInput"
import EmptyState from "@/src/components/EmptyState"
import VideoCard from "@/src/components/VideoCard"

// lib
import { searchPosts } from "@/src/lib/appwrite"
import { useAppwrite } from "@/src/lib/useAppwrite"

// types
import { VideoType } from "@/src/types"
import { useLocalSearchParams } from "expo-router"

const Search = () => {
	const { query } = useLocalSearchParams()

	const { data: posts, refetch } = useAppwrite<VideoType>(() =>
		searchPosts(query as string)
	)

	useEffect(() => {
		refetch()
	}, [query])

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
					<View className="my-6 px-4">
						<Text className="font-pmedium text-sm text-gray-100">
							Search Results
						</Text>
						<Text className="text-2xl font-psemibold text-white">
							{query}
						</Text>

						<View className="mt-6 mb-8">
							<SearchInput initialQuery={query as string} />
						</View>
					</View>
				}
			/>
		</SafeAreaView>
	)
}

export default Search
