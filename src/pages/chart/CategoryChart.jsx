import { ResponsivePie } from '@nivo/pie'
import { ChevronLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CategoryChart.css'

export default function CategoryChartPage() {
	const navigate = useNavigate()
	const location = useLocation()
	const pieData = location.state?.pieData || []

	return (
		<div className='chart-page-container'>
			<div className='chart-page-header'>
				<button onClick={() => navigate(-1)} className='back-btn'>
					<ChevronLeft />
				</button>
			</div>

			{pieData.length > 0 ? (
				<div style={{ height: 450, width: '100%', maxWidth: 600 }}>
					<ResponsivePie
						data={pieData.map(item => ({
							id: item.name,
							label: item.name,
							value: item.value,
						}))}
						margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
						innerRadius={0.6}
						padAngle={1}
						cornerRadius={4}
						activeOuterRadiusOffset={10}
						borderWidth={2}
						borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
						colors={{ scheme: 'set2' }}
						arcLinkLabelsSkipAngle={10}
						arcLinkLabelsTextColor='#ffffff'
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={{ from: 'color' }}
						arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
						theme={{
							tooltip: { container: { background: '#1e1e1e', color: '#fff' } },
							labels: { text: { fill: '#fff' } },
						}}
					/>
				</div>
			) : (
				<p className='no-data'>No category data available</p>
			)}
		</div>
	)
}
