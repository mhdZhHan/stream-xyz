import { useEffect, useState } from "react"
import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import SearchInput from "@/src/components/SearchInput"
import Trending from "@/src/components/Trending"
import EmptyState from "@/src/components/EmptyState"

import { images } from "@/src/constants"
import { getAllPosts } from "@/src/lib/appwrite"

import { UserType } from "@/src/context/GlobalProvider"

type ItemsType = {
	title?: string
	thumbnail?: string
	prompt?: string
	video?: string
	users?: UserType
	[key: string]: any
}

// const data: ItemsType[] = []

const Home = () => {
	const [data, setData] = useState<ItemsType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await getAllPosts()
				setData(response)
			} catch (error) {
				Alert.alert("Error", (error as Error).message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	console.log(data)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = async () => {
		setRefreshing(true)
		setRefreshing(false)
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={data}
				keyExtractor={(item) => item.$id.toString()}
				renderItem={({ item }) => <Text>{item.id}</Text>}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				ListEmptyComponent={
					<EmptyState
						title="No Videos Found"
						subTitle="Be the first one to upload a video"
					/>
				}
				ListHeaderComponent={
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Welcome Back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									Mohammed
								</Text>
							</View>

							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>

						<SearchInput />

						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-gray-100 text-lg font-pregular mb-3">
								Latest Videos
							</Text>

							<Trending posts={[{ id: 1 }]} />
						</View>
					</View>
				}
			/>
		</SafeAreaView>
	)
}

export default Home
