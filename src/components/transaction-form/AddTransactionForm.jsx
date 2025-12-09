import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { quickAmounts } from '../../shared/transaction-form'
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

	const filteredCategories = categories?.filter(cat => cat.type === type) ?? []

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
				category: type === 'expense' ? category : category || 'Income',
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

	return (
		<form className='transaction-form' onSubmit={handleSubmit}>
			<div className='transaction-form-header'>
				<h3>{type === 'expense' ? 'Expense' : 'Income'}</h3>
				<button
					type='button'
					className='transaction-form-close-btn'
					onClick={() => {
						setAmount('1000')
						setType('income')
						setCategory('')
						setNote('')
						setDate(new Date().toISOString().slice(0, 10))
						setError('')
						if (onClose) onClose()
					}}
				>
					<X />
				</button>
			</div>

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

			<div className='input-group'>
				<label>Category</label>
				<select
					value={category}
					onChange={e => setCategory(e.target.value)}
					required={type === 'expense'}
				>
					<option value=''>Select Category</option>
					{filteredCategories.map(cat => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>

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

			<button
				className='transaction-form-submit'
				type='submit'
				disabled={isLoading}
			>
				{isLoading ? 'Adding...' : 'Add Transaction'}
			</button>
		</form>
	)
}
