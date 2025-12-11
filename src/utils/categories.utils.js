export function findCategory(categories, t) {
	if (!categories || !t) return null
	return categories.find(
		c =>
			c._id === t.category ||
			c._id === t.cat_id ||
			c.cat_id === t.category ||
			c.cat_id === t.cat_id
	)
}

export function resolveCategoryName(category, t) {
	return (
		t?.name || category?.name || (t?.type === 'income' ? 'Income' : 'Other')
	)
}
