import './FilterToggle.css'

export function FilterToggle({ filterState, onChange }) {
	return (
		<div className='filter-toggle'>
			<button
				className={`toggle-btn ${filterState === 'income' ? 'active' : ''}`}
				onClick={() => onChange('income')}
			>
				Income
			</button>
			<button
				className={`toggle-btn ${filterState === 'expense' ? 'active' : ''}`}
				onClick={() => onChange('expense')}
			>
				Expense
			</button>
		</div>
	)
}
