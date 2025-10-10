import { useEffect, useState } from 'react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'
import './CategoryPieChart.css'

const CATEGORY_COLORS = {
	Income: '#488f31',
	Food: '#a7c162',
	Entertainment: '#fff59f',
	Shopping: '#f49e5c',
	Transport: '#c5d275',
}

export default function CategoryPieChart({ pieData, onClose }) {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setTimeout(() => setVisible(true), 10)
	}, [])

	const closeChart = () => {
		setVisible(false)
		setTimeout(onClose, 300)
	}

	return (
		<div className={`modal-overlay ${visible ? 'show' : ''}`}>
			<div className='modal-content chart-modal'>
				<button className='modal-close' onClick={closeChart}>
					&times;
				</button>
				<ResponsiveContainer width='100%' height={400}>
					<PieChart>
						<Pie
							data={pieData}
							dataKey='value'
							nameKey='name'
							cx='50%'
							cy='50%'
							outerRadius={130}
							label
						>
							{pieData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={CATEGORY_COLORS[entry.name] || '#cccccc'}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
