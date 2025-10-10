import { ArrowDownLeft, ArrowUpRight, ChartPie, Settings } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import AddTransactionForm from '../../components/transaction-form/AddTransactionForm'
import TransactionList from '../../components/transaction-list/TransactionList'
import { useDashboardLogic } from '../../hooks/useDashboardLogic'
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
		categoryTotals,
	} = useDashboardLogic()

	const [formType, setFormType] = useState('income')
	const [modalActive, setModalActive] = useState(false)
	const [filter, setFilter] = useState('income')

	if (loadingTransactions || loadingCategories) return <Loader />

	const pieData = categoryTotals
		.filter(cat => cat.total > 0)
		.map(cat => ({ name: cat.name, value: cat.total }))

	const openModal = type => {
		setFormType(type)
		setFormVisible(true)
		setTimeout(() => setModalActive(true), 10)
	}

	const closeModal = () => {
		setModalActive(false)
		setTimeout(() => setFormVisible(false), 400)
	}

	const handleOverlayClick = e => {
		if (e.target.classList.contains('modal-overlay')) closeModal()
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

			{formVisible && (
				<div
					className={`modal-overlay ${modalActive ? 'show' : ''}`}
					onClick={handleOverlayClick}
				>
					<div className={`modal-content ${modalActive ? 'animate' : ''}`}>
						<AddTransactionForm onClose={closeModal} defaultType={formType} />
					</div>
				</div>
			)}

			<div className='credit-card'>
				<div className='card-title'>Walletly</div>
				<div className='card-balance'>
					{balance.toLocaleString('fr-FR').replace(/,/g, ' ')} UZS
				</div>
			</div>

			<div className='action-buttons'>
				<button className='income-btn' onClick={() => openModal('income')}>
					<ArrowUpRight />
				</button>
				<button className='expense-btn' onClick={() => openModal('expense')}>
					<ArrowDownLeft />
				</button>
				{pieData.length > 0 && (
					<button
						className='chart-btn'
						onClick={() => navigate('/category-chart', { state: { pieData } })}
					>
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
