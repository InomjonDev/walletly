import { ArrowDownCircle, ArrowUpCircle, ChartPie } from 'lucide-react'
import { useState } from 'react'
import CategoryPieChart from '../../components/category-pie-chart/CategoryPieChart'
import Loader from '../../components/loader/Loader'
import AddTransactionForm from '../../components/transaction-form/AddTransactionForm'
import TransactionList from '../../components/transaction-list/TransactionList'
import { useDashboardLogic } from '../../hooks/useDashboardLogic'
import './Dashboard.css'

export function Dashboard() {
	const {
		transactions,
		categories,
		loadingTransactions,
		loadingCategories,
		formVisible,
		setFormVisible,
		totalIncome,
		totalOutcome,
		balance,
		categoryTotals,
	} = useDashboardLogic()

	const [formType, setFormType] = useState('income')
	const [chartVisible, setChartVisible] = useState(false)
	const [chartRender, setChartRender] = useState(false)
	const [modalActive, setModalActive] = useState(false)

	if (loadingTransactions || loadingCategories) return <Loader />

	const pieData = categoryTotals
		.filter(cat => cat.total > 0)
		.map(cat => ({ name: cat.name, value: cat.total }))

	const openChart = () => {
		setChartRender(true)
		setTimeout(() => setChartVisible(true), 10)
	}

	const closeChart = () => {
		setChartVisible(false)
		setTimeout(() => setChartRender(false), 300)
	}

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
		if (e.target.classList.contains('modal-overlay')) {
			closeModal()
		}
	}

	return (
		<div className='dashboard-container'>
			<div className='dashboard-header'>
				<h1 className='dashboard-title'>Walletly</h1>
				{pieData.length > 0 && (
					<button className='show-chart-btn' onClick={openChart}>
						<ChartPie />
					</button>
				)}
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
				<div className='card-header'>
					<span>Total Balance</span>
				</div>
				<div className='card-balance'>
					{balance.toLocaleString('fr-FR').replace(/,/g, ' ')} UZS
				</div>
				<div className='card-actions'>
					<button className='income-btn' onClick={() => openModal('income')}>
						<ArrowUpCircle />
						Income
					</button>
					<button className='expense-btn' onClick={() => openModal('expense')}>
						<ArrowDownCircle />
						Expense
					</button>
				</div>
			</div>

			{chartRender && (
				<CategoryPieChart pieData={pieData} onClose={closeChart} />
			)}

			<TransactionList transactions={transactions} categories={categories} />
		</div>
	)
}
