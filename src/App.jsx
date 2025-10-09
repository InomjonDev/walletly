import { Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import { Login } from './pages/login/Login'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route
				path='/dashboard'
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
