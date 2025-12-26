import { Button } from '@ui/'
import './FilterToggle.css'

export function FilterToggle({ filterState, onChange }) {
	return (
		<div className='filter-toggle'>
			<Button
				className={`toggle-btn ${filterState === 'income' ? 'active' : ''}`}
				onClick={() => onChange('income')}
			>
				Income
			</Button>
			<Button
				className={`toggle-btn ${filterState === 'expense' ? 'active' : ''}`}
				onClick={() => onChange('expense')}
			>
				Expense
			</Button>
		</div>
	)
}
