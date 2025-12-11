export function getFromStorage(key, defaultValue = null) {
	try {
		const raw = localStorage.getItem(key)
		return raw ? JSON.parse(raw) : defaultValue
	} catch {
		return defaultValue
	}
}

export function setToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}
