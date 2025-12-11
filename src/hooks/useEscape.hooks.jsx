import { useEffect } from 'react'

export function useEscape(callback) {
	useEffect(() => {
		function handleKey(e) {
			if (e.key === 'Escape') callback()
		}

		window.addEventListener('keydown', handleKey)
		return () => window.removeEventListener('keydown', handleKey)
	}, [callback])
}
