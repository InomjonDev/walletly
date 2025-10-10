import { Route, Routes } from 'react-router-dom'

import CategoryChart from './pages/chart/CategoryChart'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Login } from './pages/login/Login'
import { Settings } from './pages/settings/Settings'
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
			<Route
				path='/category-chart'
				element={
					<ProtectedRoute>
						<CategoryChart />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/settings'
				element={
					<ProtectedRoute>
						<Settings />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
