export function buildTransactionPayload({
	amount,
	type,
	category,
	notes,
	date,
}) {
	return {
		amount: typeof amount === 'string' ? parseFloat(amount) : amount,
		type,
		category: type === 'expense' ? category : category || 'Income',
		notes,
		date,
	}
}

export function validateTransaction({ amount, type, category }) {
	if (!amount || Number.isNaN(Number(amount)))
		return { valid: false, error: 'Amount is required' }
	if (type === 'expense' && !category)
		return { valid: false, error: 'Category is required for expenses' }
	return { valid: true }
}
