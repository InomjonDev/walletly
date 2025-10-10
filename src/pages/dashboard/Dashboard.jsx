import { ArrowDownCircle, ArrowUpCircle, ChartPie } from 'lucide-react'
import { useState } from 'react'
import CategoryPieChart from '../../components/category-pie-chart/CategoryPieChart'
import Loader from '../../components/loader/Loader'
import AddTransactionForm from '../../components/transaction-form/AddTransactionForm'
import TransactionList from '../../components/transaction-list/TransactionList'
import { useDashboardLogic } from '../../hooks/useDashboardLogic'
import './Dashboard.css'

// Git work
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
				<div className='modal-overlay show'>
					<div className='modal-content'>
						<button
							className='modal-close'
							onClick={() => setFormVisible(false)}
						>
							&times;
						</button>
						<AddTransactionForm
							onClose={() => setFormVisible(false)}
							defaultType={formType}
						/>
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
					<button
						className='income-btn'
						onClick={() => {
							setFormVisible(true)
							setFormType('income')
						}}
					>
						<ArrowUpCircle />
						Income
					</button>
					<button
						className='expense-btn'
						onClick={() => {
							setFormVisible(true)
							setFormType('expense')
						}}
					>
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
