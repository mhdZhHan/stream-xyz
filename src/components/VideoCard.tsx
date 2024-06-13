import { View, Text } from "react-native"

// types
import { VideoType } from "../types"

type VideoCardProps = {
	video: VideoType
}

const VideoCard = ({
	video: { title, thumbnail, users, prompt, video },
}: VideoCardProps) => {
	return (
		<View>
			<Text className="text-white">{title}</Text>
		</View>
	)
}

export default VideoCard
