export function todayDateString() {
	return new Date().toISOString().slice(0, 10)
}
