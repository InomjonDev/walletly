export function slugifyName(name = '') {
	return name.toLocaleLowerCase().trim().replace(/\s+/g, '_')
}

export function buildCategoryPayload({ name, type, catIcon }) {
	const n = (name || '').trim()
	return {
		name: n,
		type,
		cat_icon: catIcon,
		cat_id: slugifyName(n),
	}
}

export function isValidCategoryName(name) {
	return !!(name && name.trim().length > 0)
}
