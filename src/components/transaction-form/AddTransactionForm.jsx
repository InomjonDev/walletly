import { X } from 'lucide-react'
import useTransactionForm from '../../hooks/useTransactionForm'
import { quickAmounts } from '../../shared/transaction-form'
import './AddTransactionForm.css'

export default function AddTransactionForm({
	onClose,
	defaultType = 'income',
}) {
	const {
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
		filteredCategories,
		handleSubmit,
		resetForm,
		isLoading,
	} = useTransactionForm({ defaultType, onClose })

	return (
		<form className='transaction-form' onSubmit={handleSubmit}>
			<div className='transaction-form-header'>
				<h3>{type === 'expense' ? 'Expense' : 'Income'}</h3>
				<button
					type='button'
					className='transaction-form-close-btn'
					onClick={() => {
						resetForm()
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
