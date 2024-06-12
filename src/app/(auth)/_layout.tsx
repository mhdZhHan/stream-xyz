import { StatusBar } from "react-native"
import { Stack } from "expo-router"

const AuthLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="signup" options={{ headerShown: false }} />
			</Stack>

			<StatusBar backgroundColor="#161622" barStyle="light-content" />
		</>
	)
}

export default AuthLayout
