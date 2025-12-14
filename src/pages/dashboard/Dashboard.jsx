import { useDashboardLogic } from '@hooks/useDashboardLogic'
import { AddTransactionForm } from '@layout/'
import { CreditCardSkeleton } from '@skeletons/'
import { CreditCard, Modal, TransactionList } from '@ui/'
import { ArrowDownLeft, ArrowUpRight, ChartPie, Settings } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

export function Dashboard() {
	const navigate = useNavigate()
	const {
		transactions,
		categories,
		loadingTransactions,
		loadingCategories,
		formVisible,
		setFormVisible,
		balance,
	} = useDashboardLogic()

	const [formType, setFormType] = useState('income')
	const [filter, setFilter] = useState('income')

	const openModal = type => {
		setFormType(type)
		setFormVisible(true)
	}

	const closeModal = () => {
		setFormVisible(false)
	}

	const filteredTransactions = transactions.filter(t => t.type === filter)

	return (
		<div className='dashboard-container'>
			<div className='dashboard-header'>
				<h2 className='header-text'>Hello, Inomjon</h2>
				<div className='header-right'>
					<Link to='/settings' className='back-btn'>
						<Settings size={20} />
					</Link>
				</div>
			</div>

			<Modal isOpen={formVisible} onRequestClose={closeModal}>
				<AddTransactionForm onClose={closeModal} defaultType={formType} />
			</Modal>

			{loadingTransactions || loadingCategories ? (
				<CreditCardSkeleton />
			) : (
				<CreditCard title='Walletly' balance={balance} currency='UZS' />
			)}

			<div className='action-buttons'>
				<button className='income-btn' onClick={() => openModal('income')}>
					<ArrowUpRight />
				</button>
				<button className='expense-btn' onClick={() => openModal('expense')}>
					<ArrowDownLeft />
				</button>

				{transactions.length > 0 && (
					<button className='chart-btn' onClick={() => navigate('/analytics')}>
						<ChartPie />
					</button>
				)}
			</div>

			<TransactionList
				transactions={filteredTransactions}
				categories={categories}
				filter={filter}
				setFilter={setFilter}
			/>
		</div>
	)
}
