import { useDashboardLogic } from '@hooks/useDashboardLogic'
import { ANALYTICS_FILTER_VALUES } from '@shared/select-values.shared'
import { FilterToggle, PieChart, Select } from '@ui/'
import {
	aggregateExpensesByCategory,
	filterTransactionsByPeriod,
} from '@utils/chart.utils'
import { withAlpha } from '@utils/color.utils'
import { ChevronLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Analytics.css'

export function Analytics() {
	const navigate = useNavigate()
	const { transactions, categories, loadingTransactions } = useDashboardLogic()
	const [filter, setFilter] = useState('full')
	const [typeFilter, setTypeFilter] = useState('income')

	const { filteredData, totalAmount } = useMemo(() => {
		if (transactions.length === 0) return { filteredData: [], totalAmount: 0 }

		const filtered = filterTransactionsByPeriod(transactions, filter)
		const { data, total } = aggregateExpensesByCategory(
			filtered,
			categories,
			typeFilter
		)
		return { filteredData: data, totalAmount: total }
	}, [transactions, categories, filter, typeFilter])

	console.log(filteredData)

	return (
		<div className='chart-page-container'>
			<div className='container'>
				<div className='chart-page-header'>
					<button onClick={() => navigate(-1)} className='back-btn'>
						<ChevronLeft />
					</button>
					<h2>Monitoring</h2>
				</div>
				<div className='chart-page-actions'>
					<Select
						value={filter}
						onChange={setFilter}
						options={ANALYTICS_FILTER_VALUES}
					/>
					<FilterToggle filterState={typeFilter} onChange={setTypeFilter} />
				</div>
				{filteredData.length > 0 ? (
					<>
						<div className='chart-page-chart'>
							<div style={{ height: 450, width: '100%' }}>
								<PieChart
									data={filteredData}
									metrics={true}
									fontSize='22px'
									height='90%'
									width='100%'
									top={50}
								/>
							</div>
						</div>
						<div className='chart-page-spent-categories'>
							{filteredData.map(item => (
								<div
									key={item.id}
									className='spent-categories-item'
									style={{ backgroundColor: withAlpha(item.color, 0.5) }}
								>
									{item.label}:<span> {item.value} UZS</span>
								</div>
							))}
						</div>
					</>
				) : (
					<p className='no-data' style={{ marginBottom: '20px' }}>
						No category data available
					</p>
				)}
			</div>
		</div>
	)
}
