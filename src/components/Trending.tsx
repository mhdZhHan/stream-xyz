import { View, Text, FlatList } from "react-native"

type TrendingProps = {
	posts: { id: number }[]
}

const Trending = ({ posts }: TrendingProps) => {
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.id.toString()}
            horizontal
			renderItem={({ item }) => <Text>{item.id}</Text>}
		/>
	)
}

export default Trending
