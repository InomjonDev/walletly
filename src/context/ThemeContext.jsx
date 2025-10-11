import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem('theme') || 'dark'
	)

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') || 'dark'
		setTheme(storedTheme)
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(storedTheme)
	}, [])

	const toggleTheme = newTheme => {
		const finalTheme = newTheme || (theme === 'light' ? 'dark' : 'light')
		setTheme(finalTheme)
		localStorage.setItem('theme', finalTheme)
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(finalTheme)
	}

	return (
		<ThemeContext.Provider
			value={{ theme, toggleTheme, isDark: theme === 'dark' }}
		>
			{children}
		</ThemeContext.Provider>
	)
}
