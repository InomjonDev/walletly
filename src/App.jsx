import { Route, Routes } from 'react-router-dom'
import CategoryChart from './pages/chart/CategoryChart'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Login } from './pages/login/Login'
import { Category } from './pages/settings/category/Category'
import { Settings } from './pages/settings/Settings'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/analytics'
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
			<Route
				path='/settings/category'
				element={
					<ProtectedRoute>
						<Category />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
