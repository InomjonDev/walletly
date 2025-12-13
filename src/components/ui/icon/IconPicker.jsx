import { ICON_CHOICES } from '@shared/categories.shared'
import { Input } from '@ui'
import * as LucideIcons from 'lucide-react'
import './IconPicker.css'

export function IconPicker({ value, onChange, search, setSearch }) {
	const choices = ICON_CHOICES.filter(n =>
		n.toLowerCase().includes((search || '').toLowerCase())
	)
	return (
		<div className='icon-picker-wrapper'>
			<Input
				label='Choose icon'
				placeholder='Search for an icon'
				value={search}
				onChange={setSearch}
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
							<I size={20} />
						</button>
					)
				})}
			</div>
		</div>
	)
}
