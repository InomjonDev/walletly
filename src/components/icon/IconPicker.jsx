import { ICON_CHOICES } from '@shared/categories.shared'
import * as LucideIcons from 'lucide-react'
import './IconPicker.css'

export default function IconPicker({ value, onChange, search, setSearch }) {
	const choices = ICON_CHOICES.filter(n =>
		n.toLowerCase().includes((search || '').toLowerCase())
	)
	return (
		<div>
			<input
				className='icon-search'
				placeholder='Search for an icon'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<div className='icon-picker'>
				{choices.map(iconName => {
					const I = LucideIcons[iconName] || LucideIcons.Circle
					const selected = iconName === value
					return (
						<button
							key={iconName}
							type='button'
							className={`icon-choice ${selected ? 'selected' : ''}`}
							onClick={() => onChange(iconName)}
						>
							<I size={18} />
						</button>
					)
				})}
			</div>
		</div>
	)
}
