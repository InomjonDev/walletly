import { PieChart } from '@ui/'
import { withAlpha } from '@utils/color.utils'
import { formatAmount } from '@utils/format.utils'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './DashboardChartBlock.css'

export function DashboardChartBlock({ data }) {
	return (
		<div className='dashboard-block'>
			<div className='dashboard-block-content'>
				<Link to={'/analytics'} className='dashboard-block-content-link'>
					<ArrowUpRight size={20} />
				</Link>
				<div className='dashboard-block-chart'>
					<PieChart
						data={data.chartData}
						metrics={true}
						fontSize='12px'
						height='100%'
						width='100%'
						top={20}
					/>
				</div>

				<div className='dashboard-block-analytics'>
					<div className='dashboard-block-analytics-wrapper'>
						{data.topTwo.map((cat, inx) => (
							<div
								key={inx}
								className='dashboard-block-analytics-item'
								style={{ backgroundColor: withAlpha(cat.color, 0.12) }}
							>
								<span className='dashboard-block-analytics-item-label'>
									{cat?.label}:
								</span>
								<div className='dashboard-block-analytics-item-bottom'>
									<div
										className='dashboard-block-analytics-items-dot'
										style={{ backgroundColor: `${cat?.color}` }}
									></div>
									<strong style={{ color: `${cat?.color}` }}>
										{formatAmount(cat.value)} UZS
									</strong>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
