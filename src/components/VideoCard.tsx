import { useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av"

// constants
import { icons } from "../constants"

// types
import { VideoType } from "../types"

type VideoCardProps = {
	video: VideoType
}

const VideoCard = ({
	video: { title, thumbnail, users, prompt, video },
}: VideoCardProps) => {
	const [play, setPlay] = useState(false)

	return (
		<View className="flex-col items-center px-4 mb-14">
			<View className="flex-row gap-3 items-start">
				<View className="justify-center items-center flex-row flex-1">
					<View className="w-[46px] h-[46px] border border-secondary rounded-lg justify-center items-center p-0.5">
						<Image
							source={{ uri: users?.avatar }}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>

					<View className="justify-center flex-1 ml-3 gap-y-1">
						<Text
							className="text-white font-psemibold text-sm"
							numberOfLines={1}
						>
							{title}
						</Text>
						<Text
							className="text-xs text-gray-100 font-pregular"
							numberOfLines={1}
						>
							{users?.username}
						</Text>
					</View>
				</View>

				<View className="pt-2">
					<Image
						source={icons.menu}
						className="w-5 h-5"
						resizeMode="contain"
					/>
				</View>
			</View>

			{play ? (
				<Video
					source={{ uri: video as string }}
					className="w-full h-60 rounded-x/ mt-3"
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
						if (
							status.isLoaded &&
							!status.isBuffering &&
							"didJustFinish" in status
						) {
							if (status.didJustFinish) {
								setPlay(false)
							}
						}
					}}
				/>
			) : (
				<TouchableOpacity
					className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<Image
						source={{ uri: thumbnail }}
						className="w-full h-full rounded-xl mt-3"
						resizeMode="cover"
					/>
					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default VideoCard
