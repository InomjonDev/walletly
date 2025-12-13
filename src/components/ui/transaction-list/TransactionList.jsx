import { categoryIcons } from '@shared/categories.shared.jsx'
import { findCategory, resolveCategoryName } from '@utils/categories.utils'
import { formatAmount, formatDateTimeISO } from '@utils/format.utils'
import { getIconComponentByName } from '@utils/icons.utils'
import './TransactionList.css'

export function TransactionList({
	transactions,
	categories,
	filter,
	setFilter,
}) {
	const sortedTransactions = (transactions || [])
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)

	return (
		<div className='transaction-list'>
			<h2>Latest Transactions</h2>

			<div className='filter-toggle'>
				<button
					className={`toggle-btn ${filter === 'income' ? 'active' : ''}`}
					onClick={() => setFilter('income')}
				>
					Income
				</button>
				<button
					className={`toggle-btn ${filter === 'expense' ? 'active' : ''}`}
					onClick={() => setFilter('expense')}
				>
					Expense
				</button>
			</div>

			{sortedTransactions.length === 0 ? (
				<p className='no-transactions'>No transactions yet</p>
			) : (
				<div className='transaction-items'>
					{sortedTransactions.map(t => {
						const category = findCategory(categories, t)
						const categoryName = resolveCategoryName(category, t)

						let IconElement = null
						const IconCompFromTransaction = t.cat_icon
							? getIconComponentByName(t.cat_icon)
							: null
						const IconCompFromCategory = category?.cat_icon
							? getIconComponentByName(category.cat_icon)
							: null
						if (t.cat_icon && IconCompFromTransaction) {
							IconElement = <IconCompFromTransaction size={20} />
						} else if (category?.cat_icon && IconCompFromCategory) {
							IconElement = <IconCompFromCategory size={20} />
						} else if (categoryIcons[categoryName]) {
							IconElement = categoryIcons[categoryName]
						} else {
							const Fallback = getIconComponentByName('CreditCard')
							IconElement = <Fallback size={20} />
						}

						return (
							<div key={t._id} className={`transaction-item ${t.type}`}>
								<div className={`transaction-icon-block ${t.type}`}>
									{IconElement}
								</div>
								<div className='transaction-left'>
									<span className='transaction-category'>{categoryName}</span>
									<span className='transaction-note'>{t.notes}</span>
								</div>
								<div className='transaction-right'>
									<span className='transaction-amount'>
										{t.type === 'expense' ? '-' : '+'} {formatAmount(t.amount)}{' '}
										UZS
									</span>
									<span className='transaction-date'>
										{formatDateTimeISO(t.createdAt)}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
