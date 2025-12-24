export function withAlpha(hex, alpha = 0.12) {
	if (!hex) return 'transparent'
	const clean = hex.replace('#', '')
	const num = parseInt(clean, 16)
	const r = (num >> 16) & 255
	const g = (num >> 8) & 255
	const b = num & 255
	return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
