import * as Icons from 'lucide-react'
import { categoryIcons } from '../../shared/categories.jsx'
import './TransactionList.css'

export default function TransactionList({
	transactions,
	categories,
	filter,
	setFilter,
}) {
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

			{transactions.length === 0 ? (
				<p className='no-transactions'>No transactions yet</p>
			) : (
				<div className='transaction-items'>
					{transactions.map(t => {
						const category = categories?.find(
							c =>
								c._id === t.category ||
								c._id === t.cat_id ||
								c.cat_id === t.category ||
								c.cat_id === t.cat_id
						)

						const categoryName =
							t.name ||
							category?.name ||
							(t.type === 'income' ? 'Income' : 'Other')

						let IconElement = null
						if (t.cat_icon && Icons[t.cat_icon]) {
							const C = Icons[t.cat_icon]
							IconElement = <C size={24} />
						} else if (category?.cat_icon && Icons[category.cat_icon]) {
							const C = Icons[category.cat_icon]
							IconElement = <C size={24} />
						} else if (categoryIcons[categoryName]) {
							IconElement = categoryIcons[categoryName]
						} else {
							IconElement = <Icons.CreditCard size={24} />
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
										{t.type === 'expense' ? '-' : '+'}{' '}
										{t.amount.toLocaleString('fr-FR').replace(/,/g, ' ')} UZS
									</span>
									<span className='transaction-date'>
										{new Date(t.createdAt).toLocaleString('en-GB', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
											hour12: false,
										})}
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
