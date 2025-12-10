export function formatAmount(amount, locale = 'fr-FR') {
	if (amount == null) return ''
	try {
		return Number(amount).toLocaleString(locale).replace(/,/g, ' ')
	} catch (e) {
		return String(amount)
	}
}

export function formatDateTimeISO(isoString) {
	if (!isoString) return ''
	try {
		return new Date(isoString).toLocaleString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
	} catch (e) {
		return isoString
	}
}
