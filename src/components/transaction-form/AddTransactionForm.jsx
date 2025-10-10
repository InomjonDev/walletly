import { useEffect, useState } from 'react'
import { useGetCategoriesQuery } from '../../store/api/categories/categories.api'
import { useAddTransactionMutation } from '../../store/api/transactions/transactions.api'
import './AddTransactionForm.css'

export default function AddTransactionForm({
	onClose,
	defaultType = 'income',
}) {
	const [amount, setAmount] = useState('')
	const [type, setType] = useState(defaultType)
	const [category, setCategory] = useState('')
	const [note, setNote] = useState('')
	const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
	const [error, setError] = useState('')

	useEffect(() => {
		setType(defaultType)
		if (defaultType === 'income') setCategory('')
	}, [defaultType])

	const { data: categories } = useGetCategoriesQuery()
	const [addTransaction, { isLoading }] = useAddTransactionMutation()

	const handleSubmit = async e => {
		e.preventDefault()
		if (!amount || (type === 'expense' && !category)) {
			setError('Amount and category are required')
			return
		}

		try {
			await addTransaction({
				amount: parseFloat(amount),
				type,
				category: type === 'expense' ? category : 'Income',
				notes: note,
				date,
			}).unwrap()

			setAmount('')
			setType('income')
			setCategory('')
			setNote('')
			setDate(new Date().toISOString().slice(0, 10))
			setError('')

			if (onClose) onClose()
		} catch (err) {
			setError(err?.data?.error || 'Something went wrong')
		}
	}

	return (
		<form className='transaction-form' onSubmit={handleSubmit}>
			<h3>Add Transaction</h3>
			{error && <div className='error-message'>{error}</div>}

			<input
				type='number'
				placeholder='Amount'
				value={amount}
				onChange={e => setAmount(e.target.value)}
				required
			/>

			{type === 'expense' && (
				<select
					value={category}
					onChange={e => setCategory(e.target.value)}
					required
				>
					<option value=''>Select Category</option>
					{categories?.map(cat => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
			)}

			<input
				type='date'
				value={date}
				onChange={e => setDate(e.target.value)}
				required
			/>

			<input
				type='text'
				placeholder='Note (optional)'
				value={note}
				onChange={e => setNote(e.target.value)}
			/>

			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Adding...' : 'Add Transaction'}
			</button>
		</form>
	)
}
