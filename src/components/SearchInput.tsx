import { View, TextInput, TouchableOpacity, Image } from "react-native"

import { icons } from "../constants"

const SearchInput = () => {
	return (
		<View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				placeholderTextColor="#CDCDE0"
				placeholder="Search a video topic"
			/>

			<TouchableOpacity>
				<Image
					source={icons.search}
					className="w-5 h-5"
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	)
}

export default SearchInput
