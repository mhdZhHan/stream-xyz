import { useState } from "react"
import {
	View,
	Text,
	TextInputProps,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native"

import { icons } from "../constants"

type FormFieldProps = TextInputProps & {
	title: string
	value: string
	otherStyles: string
}

const FormField = ({ title, value, otherStyles, ...props }: FormFieldProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(true)

	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">
				{title}
			</Text>

			<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
				<TextInput
					className="flex-1 text-white font-psemibold text-base"
					value={value}
					placeholderTextColor="#7b7b8b"
					secureTextEntry={title === "Password" && showPassword}
					{...props}
				/>

				{title === "Password" && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
					>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

export default FormField
