import { View, Text, Image } from "react-native"
import { Tabs, Redirect } from "expo-router"

import { icons } from "@/src/constants"

type TabIconType = {
	name: string
	icon: string | { uri: string }
	color: string
	focused: boolean
}

const TabIcon = ({ name, icon, color, focused }: TabIconType) => {
	return (
		<View className="items-center justify-center gap-2">
			<Image
				source={typeof icon === "string" ? { uri: icon } : icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text
				className={`${
					focused ? "font-psemibold" : "font-pregular"
				} text-xs`}
				style={{ color: color }}
			>
				{name}
			</Text>
		</View>
	)
}

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#ffa001",
					tabBarInactiveTintColor: "#cdcde0",
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 1,
						borderTopColor: "#232533",
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Home"
								icon={icons.home}
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="bookmark"
					options={{
						title: "Bookmark",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Bookmark"
								icon={icons.bookmark}
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: "Create",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Create"
								icon={icons.plus}
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								name="Profile"
								icon={icons.profile}
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}

export default TabsLayout
