import { useGetCategoriesQuery } from '@store/api/categories/categories.api'
import { useAddTransactionMutation } from '@store/api/transactions/transactions.api'
import { todayDateString } from '@utils/date.utils'
import {
	buildTransactionPayload,
	validateTransaction,
} from '@utils/transaction.utils'
import { useEffect, useState } from 'react'

export default function useTransactionForm({
	defaultType = 'income',
	onClose,
} = {}) {
	const [amount, setAmount] = useState('1000')
	const [type, setType] = useState(defaultType)
	const [category, setCategory] = useState('')
	const [note, setNote] = useState('')
	const [date, setDate] = useState(todayDateString())
	const [error, setError] = useState('')

	useEffect(() => {
		setType(defaultType)
		if (defaultType === 'income') setCategory('')
	}, [defaultType])

	const { data: categories } = useGetCategoriesQuery()
	const [addTransaction, { isLoading }] = useAddTransactionMutation()

	const filteredCategories = categories?.filter(cat => cat.type === type) ?? []

	const resetForm = () => {
		setAmount('1000')
		setType('income')
		setCategory('')
		setNote('')
		setDate(todayDateString())
		setError('')
	}

	const handleSubmit = async e => {
		if (e && e.preventDefault) e.preventDefault()

		const validation = validateTransaction({ amount, type, category })
		if (!validation.valid) {
			setError(validation.error)
			return
		}

		try {
			await addTransaction(
				buildTransactionPayload({ amount, type, category, notes: note, date })
			).unwrap()
			resetForm()
			if (onClose) onClose()
		} catch (err) {
			setError(err?.data?.error || 'Something went wrong')
		}
	}

	return {
		amount,
		setAmount,
		type,
		setType,
		category,
		setCategory,
		note,
		setNote,
		date,
		setDate,
		error,
		setError,
		filteredCategories,
		handleSubmit,
		resetForm,
		isLoading,
	}
}
