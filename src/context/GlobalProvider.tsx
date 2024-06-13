import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "../lib/appwrite"

// types
import { UserType } from "../types"

type GlobalProviderProps = {
	children: React.ReactNode
}

type GlobalContextType = {
	user: UserType | null
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>
	isLoggedIn: boolean
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	isLoading: boolean
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = createContext({} as GlobalContextType)

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<UserType | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true)
					setUser(res as UserType)
				} else {
					setIsLoggedIn(false)
					setUser(null)
				}
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
				isLoading,
				setIsLoading,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
