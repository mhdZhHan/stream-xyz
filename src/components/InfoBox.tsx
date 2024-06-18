import { View, Text } from "react-native"

type InfoBoxProps = {
	title: string
	subtitle?: string
	containerStyle?: string
	titleStyles: string
}

const InfoBox = ({
	containerStyle,
	title,
	titleStyles,
	subtitle,
}: InfoBoxProps) => {
	return (
		<View className={containerStyle}>
			<Text
				className={`text-white text-center font-psemibold ${titleStyles}`}
			>
				{title}
			</Text>
			<Text className="text-sm text-gray-100 text-center font-pregular">
				{subtitle}
			</Text>
		</View>
	)
}

export default InfoBox
