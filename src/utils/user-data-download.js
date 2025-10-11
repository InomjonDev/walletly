export const downloadTransactionsExcel = transactions => {
	if (!transactions || transactions.length === 0)
		return alert('No transactions to download.')

	const headers = ['Date', 'Type', 'Category', 'Amount', 'Notes']
	const rows = transactions.map(t => [
		new Date(t.createdAt).toLocaleString(),
		t.type,
		t.categoryName || 'Other',
		t.amount,
		t.notes || '',
	])

	// Combine headers + rows using tab separators
	const content = [headers, ...rows].map(row => row.join('\t')).join('\n')

	const blob = new Blob([content], {
		type: 'application/vnd.ms-excel;charset=utf-8;',
	})
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', 'walletly_transactions.xls')
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}
