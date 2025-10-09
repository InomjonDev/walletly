import { ChartPie } from 'lucide-react'
import { useMemo, useState } from 'react'
import AddTransactionForm from '../../components/AddTransactionForm'
import CategoryPieChart from '../../components/CategoryPieChart'
import TransactionList from '../../components/TransactionList'
import { useGetCategoriesQuery } from '../../store/api/categories/categories.api'
import { useGetTransactionsQuery } from '../../store/api/transactions/transactions.api'
import './Dashboard.css'

const CATEGORY_COLORS = {
	Income: '#488f31',
	Food: '#a7c162',
	Entertainment: '#fff59f',
	Shopping: '#f49e5c',
	Transport: '#c5d275',
}

export function Dashboard() {
	const [formVisible, setFormVisible] = useState(false)
	const [formType, setFormType] = useState('income')
	const [chartVisible, setChartVisible] = useState(false)
	const [chartRender, setChartRender] = useState(false)

	const { data: transactions = [], isLoading: loadingTransactions } =
		useGetTransactionsQuery(undefined, { refetchOnFocus: true })

	const { data: categories = [], isLoading: loadingCategories } =
		useGetCategoriesQuery(undefined, { refetchOnFocus: true })

	const totalIncome = useMemo(
		() =>
			transactions
				.filter(t => t.type === 'income')
				.reduce((acc, t) => acc + t.amount, 0),
		[transactions]
	)

	const totalOutcome = useMemo(
		() =>
			transactions
				.filter(t => t.type === 'expense')
				.reduce((acc, t) => acc + t.amount, 0),
		[transactions]
	)

	const balance = totalIncome - totalOutcome

	const pieData = useMemo(() => {
		return categories
			.map(cat => {
				const catTransactions = transactions.filter(t => t.category === cat._id)
				const total = catTransactions.reduce((acc, t) => acc + t.amount, 0)
				return total > 0 ? { name: cat.name, value: total } : null
			})
			.filter(Boolean)
	}, [categories, transactions])

	if (loadingTransactions || loadingCategories)
		return <div className='dashboard-loading'>Loading...</div>

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
				<div className={`modal-overlay show`}>
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
						<span>⬆</span> Income
					</button>
					<button
						className='expense-btn'
						onClick={() => {
							setFormVisible(true)
							setFormType('expense')
						}}
					>
						<span>⬇</span> Expense
					</button>
				</div>
			</div>

			{/* Pie Chart Modal */}
			{chartRender && (
				<CategoryPieChart
					pieData={pieData}
					onClose={() => setChartRender(false)}
				/>
			)}

			<TransactionList transactions={transactions} categories={categories} />
		</div>
	)
}
