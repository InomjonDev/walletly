import { Link } from 'react-router-dom'
import { TransactionListItem } from '../transaction-list-item/TransactionListItem'
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

	const visibleTransactions = sortedTransactions.slice(0, 3)
	const hasMore = sortedTransactions.length > 3

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

			{visibleTransactions.length === 0 ? (
				<p className='no-transactions'>No transactions yet</p>
			) : (
				<>
					<div className='transaction-items'>
						{visibleTransactions.map(t => (
							<TransactionListItem
								key={t._id}
								transaction={t}
								categories={categories}
							/>
						))}
					</div>

					{hasMore && (
						<div className='see-more-link-wrapper'>
							<Link
								to='/transactions'
								className='rounded-md transaction-see-more-link'
							>
								See more…
							</Link>
						</div>
					)}
				</>
			)}
		</div>
	)
}
