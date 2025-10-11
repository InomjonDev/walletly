import {
	Car,
	CreditCard,
	Heart,
	Home,
	ShoppingCart,
	UtensilsCrossed,
} from 'lucide-react'
import './TransactionList.css'

const categoryColors = {
	Income: '#488f31',
	Food: '#a7c162',
	Entertainment: '#fff59f',
	Shopping: '#f49e5c',
	Transport: '#c5d275',
	Health: '#f49e5c',
	Home: '#4f9cff',
	Other: '#888',
}

const categoryIcons = {
	Food: <UtensilsCrossed size={24} />,
	Shopping: <ShoppingCart size={24} />,
	Transport: <Car size={24} />,
	Health: <Heart size={24} />,
	Income: <CreditCard size={24} />,
	Home: <Home size={24} />,
	Other: <CreditCard size={24} />,
}

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
						const category = categories.find(c => c._id === t.category)
						const categoryName =
							category?.name || (t.type === 'income' ? 'Income' : 'Other')
						const Icon = categoryIcons[categoryName] || <CreditCard size={24} />

						return (
							<div key={t._id} className={`transaction-item ${t.type}`}>
								<div className={`transaction-icon-block ${t.type}`}>{Icon}</div>
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
