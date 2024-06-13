import { View, Text, Image } from "react-native"
import { images } from "../constants"
import CustomButton from "./CustomButton"
import { router } from "expo-router"

type EmptyStateProps = {
	title: string
	subTitle: string
}

const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
	return (
		<View className="justify-center items-center px-4">
			<Image
				source={images.empty}
				className="w-[270px] h-[215px]"
				resizeMode="contain"
			/>
			<Text className="font-pmedium text-sm text-gray-100">
				{subTitle}
			</Text>
			<Text className="text-2xl text-center font-psemibold text-white mt-2">
				{title}
			</Text>

			<CustomButton
				title="Create Video"
				handlePress={() => router.push("/create")}
				containerStyles="w-full my-5"
			/>
		</View>
	)
}

export default EmptyState
