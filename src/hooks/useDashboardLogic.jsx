import { useGetCategoriesQuery } from '@store/api/categories/categories.api'
import {
	useAddTransactionMutation,
	useGetTransactionsQuery,
} from '@store/api/transactions/transactions.api'
import { useMemo, useState } from 'react'

export function useDashboardLogic() {
	const { data: transactions = [], isLoading: loadingTransactions } =
		useGetTransactionsQuery(null, { refetchOnFocus: true })

	const { data: categories = [], isLoading: loadingCategories } =
		useGetCategoriesQuery(null, { refetchOnFocus: true })

	const [addTransaction] = useAddTransactionMutation()

	const [formVisible, setFormVisible] = useState(false)
	const [formData, setFormData] = useState({
		type: 'income',
		categoryId: '',
		amount: '',
		description: '',
	})
	const [submitting, setSubmitting] = useState(false)

	const totalIncome = useMemo(
		() =>
			transactions
				.filter(t => t.type === 'income')
				.reduce((acc, t) => acc + t.amount, 0),
		[transactions]
	)

	const totalOutcome = useMemo(
		() =>
			transactions
				.filter(t => t.type === 'expense')
				.reduce((acc, t) => acc + t.amount, 0),
		[transactions]
	)

	const balance = useMemo(
		() => totalIncome - totalOutcome,
		[totalIncome, totalOutcome]
	)

	const categoryTotals = useMemo(() => {
		const totalsMap = {}
		transactions.forEach(t => {
			const category = categories.find(c => c._id === t.category)
			const name = category?.name || (t.type === 'income' ? 'Income' : 'Other')
			if (!totalsMap[name]) totalsMap[name] = 0
			totalsMap[name] += t.amount
		})
		return Object.entries(totalsMap).map(([name, total]) => ({ name, total }))
	}, [transactions, categories])

	const handleFormChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleFormSubmit = async e => {
		e.preventDefault()
		if (
			!formData.amount ||
			!formData.categoryId ||
			Number(formData.amount) <= 0
		)
			return
		setSubmitting(true)
		try {
			await addTransaction({
				type: formData.type,
				amount: Number(formData.amount),
				category: formData.categoryId,
				notes: formData.description || '',
				date: new Date().toISOString(),
			}).unwrap()

			setFormVisible(false)
			setFormData({
				type: 'income',
				categoryId: '',
				amount: '',
				description: '',
			})
		} catch (err) {
			console.error('Transaction error:', err)
		} finally {
			setSubmitting(false)
		}
	}

	return {
		transactions,
		categories,
		loadingTransactions,
		loadingCategories,
		formVisible,
		setFormVisible,
		formData,
		setFormData,
		submitting,
		totalIncome,
		totalOutcome,
		balance,
		handleFormChange,
		handleFormSubmit,
	}
}
