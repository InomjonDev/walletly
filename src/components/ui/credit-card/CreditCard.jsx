import { formatAmount } from '@utils/format.utils'
import './CreditCard.css'

export function CreditCard({ title, balance, currency }) {
	return (
		<div className='credit-card'>
			<div className='card-title'>{title}</div>
			<div className='card-balance'>
				{formatAmount(balance)} {currency}
			</div>
		</div>
	)
}
