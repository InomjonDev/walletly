import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login/Login'
import ProtectedRoute from './routes/ProtectedRoute'

import { pages } from '@routes/all-pages.routes'

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route element={<ProtectedRoute />}>
				{pages?.map(({ path, element }, index) => (
					<Route key={index} path={path} element={element} />
				))}
			</Route>
		</Routes>
	)
}

export default App
