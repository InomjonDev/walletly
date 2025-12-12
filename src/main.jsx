import { CategoryInitializer } from '@layout/category-initializer/CategoryInitializer.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<AuthProvider>
					<CategoryInitializer />
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</AuthProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
