import { useEffect, useState } from 'react'
import { useGetCategoriesQuery } from '../../store/api/categories/categories.api'
import { useAddTransactionMutation } from '../../store/api/transactions/transactions.api'
import './AddTransactionForm.css'

export default function AddTransactionForm({
	onClose,
	defaultType = 'income',
}) {
	const [amount, setAmount] = useState('1000')
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

			setAmount('1000')
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

	const quickAmounts = [5000, 10000, 35000]

	return (
		<form className='transaction-form' onSubmit={handleSubmit}>
			<h3>{type === 'expense' ? 'Expense' : 'Income'}</h3>
			{error && <div className='error-message'>{error}</div>}

			<div className='input-group'>
				<label>Amount</label>
				<input
					type='number'
					value={amount}
					onChange={e => setAmount(e.target.value)}
					required
				/>
				<div className='quick-amounts'>
					{quickAmounts.map(val => (
						<button
							type='button'
							key={val}
							onClick={() => setAmount(String(val))}
						>
							{val.toLocaleString('en-US')} UZS
						</button>
					))}
				</div>
			</div>

			{type === 'expense' && (
				<div className='input-group'>
					<label>Category</label>
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
				</div>
			)}

			<div className='input-group'>
				<label>Date</label>
				<input
					type='date'
					value={date}
					onChange={e => setDate(e.target.value)}
					required
				/>
			</div>

			<div className='input-group'>
				<label>Note</label>
				<input
					type='text'
					value={note}
					onChange={e => setNote(e.target.value)}
				/>
			</div>

			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Adding...' : 'Add Transaction'}
			</button>
		</form>
	)
}
