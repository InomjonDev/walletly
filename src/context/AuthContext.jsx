import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.js'

export const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				const idToken = await user.getIdToken()
				setCurrentUser(user)
				setToken(idToken)
				localStorage.setItem('token', idToken)
			} else {
				setCurrentUser(null)
				setToken(null)
				localStorage.removeItem('token')
			}
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const login = async () => {
		const provider = new GoogleAuthProvider()
		const result = await signInWithPopup(auth, provider)

		const idToken = await result.user.getIdToken()
		setCurrentUser(result.user)
		setToken(idToken)
		localStorage.setItem('token', idToken)
	}

	const logout = async () => {
		await signOut(auth)
		setCurrentUser(null)
		setToken(null)
		localStorage.removeItem('token')
	}

	const value = {
		currentUser,
		token,
		login,
		logout,
		isAuthenticated: !!currentUser,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
