import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './firebase'

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider()

	const result = await signInWithPopup(auth, provider)
	const token = await result.user.getIdToken()

	// Store token to localStorage
	localStorage.setItem('token', token)

	return {
		user: result.user,
		token,
	}
}

export const logout = async () => {
	await signOut(auth)
	localStorage.removeItem('token')
}
