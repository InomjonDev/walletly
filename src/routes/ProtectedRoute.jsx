import { useAuth } from '@context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useAuth()

	if (loading) return null

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}
