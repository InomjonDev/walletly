export function isSameDay(d1, d2) {
	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	)
}

export function startOfDaysAgo(days) {
	const now = new Date()
	const d = new Date(now)
	d.setDate(now.getDate() - days)
	return d
}

export function filterTransactionsByPeriod(transactions = [], filter = 'full') {
	if (!transactions || transactions.length === 0) return []
	const now = new Date()
	const startOfWeek = startOfDaysAgo(7)
	const startOfMonth = startOfDaysAgo(30)

	return transactions.filter(item => {
		const itemDate = new Date(item.createdAt)
		if (filter === 'daily') return isSameDay(itemDate, now)
		if (filter === 'weekly') return itemDate >= startOfWeek
		if (filter === 'monthly') return itemDate >= startOfMonth
		return true
	})
}

export function aggregateExpensesByCategory(
	transactions = [],
	categories = [],
	type
) {
	const categoryMap = {}
	let total = 0

	transactions.forEach(item => {
		if (item.type !== type) return
		const categoryObj = categories.find(c => c._id === item.category)
		const categoryName = categoryObj?.name || 'Other'
		const amount = Number(item.amount) || 0
		const categoryColor = categoryObj?.color || null

		if (!categoryMap[categoryName]) {
			categoryMap[categoryName] = { value: 0, color: categoryColor }
		}

		categoryMap[categoryName].value += amount
		total += amount
	})

	const data = Object.entries(categoryMap).map(([name, obj]) => ({
		id: name,
		label: name,
		value: obj.value,
		color: obj.color,
	}))

	return { data, total }
}

export function getFilterLabel(filter) {
	return filter === 'daily'
		? 'Today'
		: filter === 'weekly'
		? 'This Week'
		: filter === 'monthly'
		? 'This Month'
		: 'All Time'
}

export function formatTotalAmount(amount, locale = 'en-US') {
	try {
		return Number(amount).toLocaleString(locale)
	} catch (e) {
		return String(amount)
	}
}

export function calculateTotalExpenses(transactions = []) {
	return transactions
		.filter(t => t.type === 'expense')
		.reduce((total, t) => total + (Number(t.amount) || 0), 0)
}

export function calculateTotalIncome(transactions = []) {
	return transactions
		.filter(t => t.type === 'income')
		.reduce((total, t) => total + (Number(t.amount) || 0), 0)
}
