import { useState } from "react"
import {
	Image,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	ViewStyle,
	ViewToken,
} from "react-native"
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"
import * as Animatable from "react-native-animatable"

// types
import { VideoType } from "../types"
import { icons } from "../constants"

type TrendingProps = {
	videos: VideoType[]
}

const zoomIn: Animatable.CustomAnimation<ViewStyle | any> = {
	0: {
		transform: [{ scale: 0.9 }],
	},
	1: {
		transform: [{ scale: 1.1 }],
	},
}

const zoomOut: Animatable.CustomAnimation<ViewStyle | any> = {
	0: {
		transform: [{ scale: 1 }],
	},
	1: {
		transform: [{ scale: 0.9 }],
	},
}

const TrendingItem = ({
	activeItem,
	item,
}: {
	activeItem: VideoType | string
	item: VideoType
}) => {
	const [play, setPlay] = useState(false)

	return (
		<Animatable.View
			className="mr-5"
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Video
					source={{
						uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					}}
					className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
					className="relative justify-center items-center"
					activeOpacity={0.5}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{ uri: item?.thumbnail }}
						className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
						resizeMode="cover"
					/>
					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	)
}

const Trending = ({ videos }: TrendingProps) => {
	const [activeItem, setActiveItem] = useState<VideoType | string>(videos[1])

	/**
	 *
	 * `viewableItemChanges` give the current visible items in the FlatList
	 *
	 * `{ itemVisiblePercentThreshold: 70 }` means that an item is
	 * considered viewable when at least 70% of it is visible on the screen.
	 *
	 * `{ x: 170, y: 0 }` sets the initial horizontal scroll position to 170 pixels
	 * from the left and the vertical scroll position to 0 pixels from the top.
	 */
	const viewableItemChanges = ({
		viewableItems,
	}: {
		viewableItems: ViewToken<VideoType>[]
	}) => {
		if (viewableItems.length > 0) {
			// `key` => is the `$id` it's from the keyExtractor={(item) => item.$id.toString()}
			setActiveItem(viewableItems[0].key)
		}
	}

	return (
		<FlatList
			data={videos}
			keyExtractor={(item) => item.$id.toString()}
			horizontal
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			// viewable item
			onViewableItemsChanged={viewableItemChanges}
			viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
			contentOffset={{ x: 170, y: 0 }}
		/>
	)
}

export default Trending
