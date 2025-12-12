import { useDashboardLogic } from '@hooks/useDashboardLogic'
import { ResponsivePie } from '@nivo/pie'
import { Loader, Select } from '@ui/'
import {
	aggregateExpensesByCategory,
	filterTransactionsByPeriod,
	formatTotalAmount,
	getFilterLabel,
} from '@utils/chart.utils'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Analytics.css'

export function Analytics() {
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

		const filtered = filterTransactionsByPeriod(transactions, filter)
		const { data, total } = aggregateExpensesByCategory(filtered, categories)
		return { filteredData: data, totalAmount: total }
	}, [transactions, categories, filter])

	if (loadingTransactions) return <Loader />

	const filterLabel = getFilterLabel(filter)

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
							<span className='amount'>
								{formatTotalAmount(totalAmount)} UZS
							</span>
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
							<Select
								value={filter}
								onChange={setFilter}
								options={[
									{ label: 'Daily', value: 'daily' },
									{ label: 'Weekly', value: 'weekly' },
									{ label: 'Monthly', value: 'monthly' },
									{ label: 'Full', value: 'full' },
								]}
							/>
						</div>
					</>
				) : (
					<p className='no-data'>No category data available</p>
				)}
			</div>
		</div>
	)
}
