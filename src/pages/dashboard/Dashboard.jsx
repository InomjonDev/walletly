import { ArrowDownLeft, ArrowUpRight, ChartPie, Settings } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import AddTransactionForm from '../../components/transaction-form/AddTransactionForm'
import TransactionList from '../../components/transaction-list/TransactionList'
import Modal from '../../components/ui/Modal'
import { useDashboardLogic } from '../../hooks/useDashboardLogic'
import { formatAmount } from '../../utils/format'
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

	if (loadingTransactions || loadingCategories) return <Loader />

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
					<Link to={'/settings'} className='settings-btn'>
						<Settings />
					</Link>
				</div>
			</div>

			<Modal isOpen={formVisible} onRequestClose={closeModal}>
				<AddTransactionForm onClose={closeModal} defaultType={formType} />
			</Modal>

			<div className='credit-card'>
				<div className='card-title'>Walletly</div>
				<div className='card-balance'>{formatAmount(balance)} UZS</div>
			</div>

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
