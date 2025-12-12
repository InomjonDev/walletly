import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './Select.css'

export function Select({
	value,
	onChange,
	options = [],
	placeholder = 'Select',
	label,
}) {
	const [open, setOpen] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const handler = e => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false)
		}
		document.addEventListener('click', handler)
		return () => document.removeEventListener('click', handler)
	}, [])

	const selectedOption = options.find(opt => opt.value === value)

	return (
		<div className='custom-select-container' ref={ref}>
			{label && <div className='custom-select-label'>{label}</div>}

			<button
				type='button'
				className='custom-select-trigger'
				onClick={() => setOpen(!open)}
			>
				<span className={selectedOption ? '' : 'placeholder'}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDown className={open ? 'rotate' : ''} size={20} />
			</button>

			{open && (
				<div className='custom-select-dropdown'>
					{options.map(opt => (
						<div
							key={opt.value}
							className='custom-select-option'
							onClick={() => {
								onChange(opt.value)
								setOpen(false)
							}}
						>
							{opt.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
