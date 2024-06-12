import { View, Text, ScrollView, Image, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router, Redirect } from "expo-router"

import { images } from "../constants"
import CustomButton from "../components/CustomButton"
import { useGlobalContext } from "../context/GlobalProvider"

const App = () => {
	const { isLoading, isLoggedIn } = useGlobalContext()

	if (isLoggedIn && !isLoading) return <Redirect href="/home" />

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full flex justify-center items-center h-full px-4">
					<Image
						source={images.logo}
						className="w-[130px] h-[84px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>

					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">
							Discover Endless Possibilities with{" "}
							<Text className="text-secondary-200">
								Aistream-xyz
							</Text>
						</Text>

						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute -bottom-2 right-10"
							resizeMode="contain"
						/>
					</View>

					<Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
						Where creativity meets innovation:embark on a journey of
						limitless exploration with xyz
					</Text>

					<CustomButton
						title="Continue with Email"
						containerStyles="w-full mt-7"
						handlePress={() => router.push("/login")}
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" barStyle="light-content" />
		</SafeAreaView>
	)
}

export default App
