import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

export function Login() {
	const { login, isAuthenticated } = useAuth()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleGoogleLogin = async () => {
		if (loading) return
		setLoading(true)
		setError('')
		try {
			await login()
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	if (isAuthenticated) return <Navigate to='/dashboard' replace />

	return (
		<div className='login-container'>
			<div className='login-card'>
				<div className='login-header'>
					<h1>Welcome to Walletly</h1>
					<p className='welcome-text'>Your smart money tracker</p>
				</div>

				{error && <div className='error-message'>{error}</div>}

				<div className='social-login'>
					<button
						type='button'
						className='social-button'
						onClick={handleGoogleLogin}
						disabled={loading}
					>
						<LogIn size={20} strokeWidth={2} />
						<span>{loading ? 'Signing In...' : 'Sign In with Google'}</span>
					</button>
				</div>
			</div>
		</div>
	)
}
