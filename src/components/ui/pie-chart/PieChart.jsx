import { ResponsivePie } from '@nivo/pie'
import { formatAmount } from '@utils/format.utils'
import './PieChart.css'

export function PieChart({ data, metrics }) {
	const CenterMetric = ({ centerX, centerY, value }) => (
		<text
			x={centerX}
			y={centerY}
			textAnchor='middle'
			dominantBaseline='central'
			className='dashboard-block-chart-text'
			fill='var(--color-text-main)'
		>
			{value}
		</text>
	)

	const total = data.chartData.reduce((sum, item) => sum + item.value, 0)
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<ResponsivePie
				data={data.chartData}
				margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
				innerRadius={0.7}
				padAngle={2}
				cornerRadius={5}
				activeOuterRadiusOffset={3}
				borderWidth={2}
				borderColor={{ from: 'color', modifiers: [['darker', 1]] }}
				colors={({ data }) => data.color}
				enableArcLabels={false}
				enableArcLinkLabels={false}
				tooltip={() => null}
				layers={[
					'arcs',
					props => (
						<CenterMetric
							centerX={props.centerX}
							centerY={props.centerY}
							value={`${formatAmount(total)} UZS`}
						/>
					),
				]}
			/>
		</div>
	)
}
