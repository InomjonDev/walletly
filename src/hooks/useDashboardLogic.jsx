import { useMemo, useState } from 'react'
import { useGetCategoriesQuery } from '../store/api/categories/categories.api'
import {
	useAddTransactionMutation,
	useGetTransactionsQuery,
} from '../store/api/transactions/transactions.api'

export function useDashboardLogic() {
	const { data: transactions = [], isLoading: loadingTransactions } =
		useGetTransactionsQuery(undefined, { refetchOnFocus: true })

	const { data: categories = [], isLoading: loadingCategories } =
		useGetCategoriesQuery(undefined, { refetchOnFocus: true })

	const [addTransaction] = useAddTransactionMutation()
	const [formVisible, setFormVisible] = useState(false)
	const [formData, setFormData] = useState({
		type: 'income',
		categoryId: '',
		amount: 0,
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
				.filter(t => t.type === 'outcome')
				.reduce((acc, t) => acc + t.amount, 0),
		[transactions]
	)

	const balance = totalIncome - totalOutcome

	const categoryTotals = useMemo(
		() =>
			categories.map(cat => {
				const catTransactions = transactions.filter(
					t => t.categoryId === cat._id
				)
				const income = catTransactions
					.filter(t => t.type === 'income')
					.reduce((acc, t) => acc + t.amount, 0)
				const outcome = catTransactions
					.filter(t => t.type === 'outcome')
					.reduce((acc, t) => acc + t.amount, 0)
				return { name: cat.name, income, outcome }
			}),
		[categories, transactions]
	)

	const handleFormChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleFormSubmit = async e => {
		e.preventDefault()
		if (!formData.amount || !formData.categoryId) return
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
				amount: 0,
				description: '',
			})
		} catch (err) {
			console.error(err)
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
		categoryTotals,
		handleFormChange,
		handleFormSubmit,
	}
}
