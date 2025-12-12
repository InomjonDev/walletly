import './SettingsItem.css'

export function SettingsItem({ title, description, onClick, right }) {
	return (
		<div
			className='settings-item'
			onClick={onClick}
			style={{ cursor: onClick ? 'pointer' : 'default' }}
		>
			<div className='item-info'>
				<span>{title}</span>
				<p>{description}</p>
			</div>
			<div className='item-action'>{right}</div>
		</div>
	)
}
