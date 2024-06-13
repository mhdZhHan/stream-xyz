import { View, Text } from "react-native"

type VideoType = {
	title: string
	thumbnail: string
	video: string
	avatar: string
	username: string
}

type VideoCardProps = {
	video: VideoType
}

const VideoCard = ({
	video: { title, thumbnail, video, avatar, username },
}: VideoCardProps) => {
	return (
		<View>
			<Text>VideoCard</Text>
		</View>
	)
}

export default VideoCard
