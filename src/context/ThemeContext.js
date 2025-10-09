import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') || 'light'
		setTheme(storedTheme)
		document.documentElement.classList.toggle('dark', storedTheme === 'dark')
	}, [])

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		document.documentElement.classList.toggle('dark', newTheme === 'dark')
	}

	const value = {
		theme,
		toggleTheme,
		isDark: theme === 'dark',
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
