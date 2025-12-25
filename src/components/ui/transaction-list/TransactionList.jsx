import { TransactionListItem } from '../transaction-list-item/TransactionListItem'
import './TransactionList.css'

export function TransactionList({ transactions, categories }) {
	const sortedTransactions = (transactions || [])
		.slice()
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)

	const visibleTransactions = sortedTransactions.slice(0, 3)

	return (
		<div className='transaction-list'>
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
				</>
			)}
		</div>
	)
}
