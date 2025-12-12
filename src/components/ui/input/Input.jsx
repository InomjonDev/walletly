import { useId } from 'react'
import './Input.css'

export function Input({
	label,
	value,
	onChange,
	type = 'text',
	placeholder = '',
	error = '',
	disabled = false,
	required = false,
}) {
	const id = useId()

	return (
		<div className='ui-input-container'>
			{label && (
				<label htmlFor={id} className='ui-input-label'>
					{label}
				</label>
			)}

			<input
				id={id}
				type={type}
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				className={`ui-input-field ${error ? 'error' : ''}`}
			/>

			{error && <div className='ui-input-error'>{error}</div>}
		</div>
	)
}
