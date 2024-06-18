import { useState } from "react"
import { View, Text, ScrollView, Image, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, router } from "expo-router"

// constants
import { images } from "@/src/constants"

// components
import FormField from "@/src/components/FormField"
import CustomButton from "@/src/components/CustomButton"

// lib
import { createUser } from "@/src/lib/appwrite"

// contexts
import { useGlobalContext } from "@/src/context/GlobalProvider"

type FormType = {
	username: string
	email: string
	password: string
}

const SignUp = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext()

	const [form, setForm] = useState<FormType>({} as FormType)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert("Please fill in all the fields")
		}

		setIsSubmitting(true)

		try {
			const result = await createUser({
				email: form.email,
				password: form.password,
				username: form.username,
			})

			// set to global state
			setUser(result)
			setIsLoggedIn(true)

			router.replace("/home")
		} catch (error) {
			Alert.alert("Error h", (error as Error).message)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[83vh] px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[100px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
						Sign Up to AiStreamxyz
					</Text>

					<FormField
						title="Username"
						value={form.username}
						otherStyles="mt-7"
						placeholder=""
						onChangeText={(text) =>
							setForm({ ...form, username: text })
						}
					/>

					<FormField
						title="Email"
						value={form.email}
						otherStyles="mt-7"
						keyboardType="email-address"
						placeholder=""
						onChangeText={(text) =>
							setForm({ ...form, email: text })
						}
					/>

					<FormField
						title="Password"
						value={form.password}
						otherStyles="mt-7"
						placeholder=""
						onChangeText={(text) =>
							setForm({ ...form, password: text })
						}
					/>

					<CustomButton
						title="Sign Up"
						containerStyles="mt-7"
						handlePress={submit}
						isLoading={isSubmitting}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/login"
							className="text-lg font-psemibold text-secondary"
						>
							Login
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUp
