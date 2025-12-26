import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../button/Button.jsx'
import './Calendar.css'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Calendar({ value, onChange, position = 'top' }) {
	const [open, setOpen] = useState(false)
	const [currentDate, setCurrentDate] = useState(
		value ? new Date(value) : new Date()
	)
	const ref = useRef(null)

	const year = currentDate.getFullYear()
	const month = currentDate.getMonth()
	const firstDay = new Date(year, month, 1).getDay()
	const daysInMonth = new Date(year, month + 1, 0).getDate()

	const prevMonth = () => setCurrentDate(new Date(year, month - 1))
	const nextMonth = () => setCurrentDate(new Date(year, month + 1))

	const dates = []
	for (let i = 0; i < firstDay; i++) dates.push(null)
	for (let i = 1; i <= daysInMonth; i++) dates.push(new Date(year, month, i))

	useEffect(() => {
		const handleClick = e => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false)
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [])

	return (
		<div className='calendar-picker' ref={ref}>
			<div className='calendar-trigger' onClick={() => setOpen(prev => !prev)}>
				{value ? new Date(value).toLocaleDateString() : 'Select date'}
			</div>

			{open && (
				<div className='calendar' style={{ [position]: '110%' }}>
					<div className='calendar-header'>
						<Button onClick={prevMonth}>
							<ChevronLeft />
						</Button>
						<span>
							{currentDate.toLocaleString('default', { month: 'long' })} {year}
						</span>
						<Button onClick={nextMonth}>
							<ChevronRight />
						</Button>
					</div>

					<div className='calendar-grid'>
						{days.map(d => (
							<div key={d} className='day-name'>
								{d}
							</div>
						))}

						{dates.map((date, i) => {
							const isSelected =
								value &&
								date &&
								new Date(value).toDateString() === date.toDateString()

							return (
								<div
									key={i}
									className={`day ${!date ? 'empty' : ''} ${
										isSelected ? 'selected' : ''
									}`}
									onClick={() => {
										if (!date) return
										onChange(date.toISOString())
										setOpen(false)
									}}
								>
									{date ? date.getDate() : ''}
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}
