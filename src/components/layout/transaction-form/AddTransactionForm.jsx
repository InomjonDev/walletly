import useTransactionForm from '@hooks/useTransactionForm'
import { quickAmounts } from '@shared/transaction-form.shared'
import { Button, Calendar, Input, Select } from '@ui/'
import { X } from 'lucide-react'
import './AddTransactionForm.css'

export function AddTransactionForm({ onClose, defaultType = 'income' }) {
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
				<Button
					className='transaction-form-close-btn'
					onClick={() => {
						resetForm()
						if (onClose) onClose()
					}}
				>
					<X size={20} />
				</Button>
			</div>

			<div className='input-group'>
				<Input
					label='Amount (UZS)'
					type='number'
					value={amount}
					onChange={setAmount}
					required={true}
				/>
				<div className='quick-amounts'>
					{quickAmounts.map(val => (
						<Button
							type='button'
							key={val}
							onClick={() => setAmount(String(val))}
						>
							{val.toLocaleString('en-US')} UZS
						</Button>
					))}
				</div>
			</div>

			<div className='input-group'>
				<Select
					value={category}
					onChange={setCategory}
					label='Category'
					options={[
						...filteredCategories.map(cat => ({
							label: cat.name,
							value: cat._id,
						})),
					]}
				/>
			</div>

			<div className='input-group'>
				<label className='input-label'>Date</label>
				<Calendar value={date} onChange={setDate} />
			</div>

			<div className='input-group'>
				<Input
					value={note}
					onChange={setNote}
					label='Note'
					placeholder='Note'
				/>
			</div>

			<Button
				className='transaction-form-submit'
				type='submit'
				disabled={isLoading}
			>
				{isLoading ? 'Adding...' : 'Add Transaction'}
			</Button>
		</form>
	)
}
