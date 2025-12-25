import { ResponsivePie } from '@nivo/pie'
import { formatAmount } from '@utils/format.utils'
import './PieChart.css'

export function PieChart({ data, metrics, fontSize, height, width, top }) {
	const CenterMetric = ({ centerX, centerY, value }) => (
		<text
			x={centerX}
			y={centerY}
			textAnchor='middle'
			dominantBaseline='central'
			className='dashboard-block-chart-text'
			fill='var(--color-text-main)'
			fontSize={fontSize}
		>
			{value}
		</text>
	)

	return (
		<div style={{ height, width }}>
			<ResponsivePie
				data={data}
				margin={{ top, right: 10, bottom: 10, left: 10 }}
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
				layers={
					metrics
						? [
								'arcs',
								props => (
									<CenterMetric
										centerX={props.centerX}
										centerY={props.centerY}
										value={`${formatAmount(
											data.reduce((sum, item) => sum + item.value, 0)
										)} UZS`}
									/>
								),
						  ]
						: ['arcs']
				}
			/>
		</div>
	)
}
