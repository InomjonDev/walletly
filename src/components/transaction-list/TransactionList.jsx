import './TransactionList.css'

export default function TransactionList({ transactions, categories }) {
	return (
		<div className='transaction-list'>
			<h2>Transactions</h2>
			{transactions.length === 0 ? (
				<p className='no-transactions'>No transactions yet</p>
			) : (
				<div className='transaction-items'>
					{transactions
						.slice()
						.reverse()
						.map(t => {
							const categoryName =
								categories.find(c => c._id === t.category)?.name ||
								(t.type === 'income' ? 'Income' : 'Other')
							return (
								<div key={t._id} className={`transaction-item ${t.type}`}>
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
											{new Date(t.date).toLocaleDateString()}
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
