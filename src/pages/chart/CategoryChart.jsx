import { ResponsivePie } from '@nivo/pie'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { useDashboardLogic } from '../../hooks/useDashboardLogic'
import './CategoryChart.css'

export default function CategoryChartPage() {
	const navigate = useNavigate()
	const { transactions, categories, loadingTransactions } = useDashboardLogic()
	const [filter, setFilter] = useState('full')
	const [textColor, setTextColor] = useState('#ffffff')
	const [bgColor, setBgColor] = useState('#1e1e1e')

	useEffect(() => {
		const rootStyles = getComputedStyle(document.documentElement)
		setTextColor(rootStyles.getPropertyValue('--color-text-main').trim())
		setBgColor(rootStyles.getPropertyValue('--color-bg-card').trim())
	}, [])

	const { filteredData, totalAmount } = useMemo(() => {
		if (transactions.length === 0) return { filteredData: [], totalAmount: 0 }

		const now = new Date()
		const isSameDay = (d1, d2) =>
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()

		const startOfWeek = new Date(now)
		startOfWeek.setDate(now.getDate() - 7)

		const startOfMonth = new Date(now)
		startOfMonth.setMonth(now.getMonth() - 1)

		const filtered = transactions.filter(item => {
			const itemDate = new Date(item.createdAt)
			if (filter === 'daily') return isSameDay(itemDate, now)
			if (filter === 'weekly') return itemDate >= startOfWeek
			if (filter === 'monthly') return itemDate >= startOfMonth
			return true
		})

		const categoryMap = {}
		let total = 0

		filtered.forEach(item => {
			if (item.type === 'income') return
			const categoryObj = categories.find(c => c._id === item.category)
			const categoryName = categoryObj?.name || 'Other'
			const amount = Number(item.amount) || 0
			categoryMap[categoryName] = (categoryMap[categoryName] || 0) + amount
			total += amount
		})

		const data = Object.entries(categoryMap).map(([name, value]) => ({
			id: name,
			label: name,
			value,
		}))

		return { filteredData: data, totalAmount: total }
	}, [transactions, categories, filter])

	if (loadingTransactions) return <Loader />

	const filterLabel =
		filter === 'daily'
			? 'Today'
			: filter === 'weekly'
			? 'This Week'
			: filter === 'monthly'
			? 'This Month'
			: 'All Time'

	return (
		<div className='chart-page-container'>
			<div className='container'>
				<div className='chart-page-header'>
					<button onClick={() => navigate(-1)} className='back-btn'>
						<ChevronLeft />
					</button>
					<h2>Monitoring</h2>
				</div>

				{filteredData.length > 0 ? (
					<>
						<div className='total-expense'>
							Total Expense ({filterLabel}):{' '}
							<span className='amount'>{totalAmount.toLocaleString()} UZS</span>
						</div>
						<div className='chart-page-chart'>
							<div style={{ height: 450, width: '100%' }}>
								<ResponsivePie
									data={filteredData}
									margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
									innerRadius={0.6}
									padAngle={1}
									cornerRadius={4}
									activeOuterRadiusOffset={10}
									borderWidth={2}
									borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
									colors={{ scheme: 'set2' }}
									arcLinkLabelsSkipAngle={10}
									arcLinkLabelsTextColor={textColor}
									arcLinkLabelsThickness={2}
									arcLinkLabelsColor={{ from: 'color' }}
									arcLabelsTextColor={textColor}
									theme={{
										tooltip: {
											container: { background: bgColor, color: textColor },
										},
										labels: { text: { fill: textColor } },
									}}
								/>
							</div>
							<select
								className='filter-select full-width'
								value={filter}
								onChange={e => setFilter(e.target.value)}
							>
								<option value='daily'>Daily</option>
								<option value='weekly'>Weekly</option>
								<option value='monthly'>Monthly</option>
								<option value='full'>Full</option>
							</select>
						</div>
					</>
				) : (
					<p className='no-data'>No category data available</p>
				)}
			</div>
		</div>
	)
}
