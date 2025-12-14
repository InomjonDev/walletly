import { Check } from 'lucide-react'
import { useId } from 'react'
import './Checkbox.css'

export function Checkbox({ label, value = false, onChange }) {
	const id = useId()

	return (
		<div className='ui-checkbox-container'>
			<label htmlFor={id} className='ui-checkbox-label'>
				<button
					type='button'
					id={id}
					role='checkbox'
					aria-checked={value ? 'true' : 'false'}
					className='ui-checkbox-button'
					onClick={() => onChange(!value)}
				>
					{value && <Check size={14} />}
				</button>
				{label}
			</label>
		</div>
	)
}
