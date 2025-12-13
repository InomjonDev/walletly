import './CreditCardSkeleton.css'

export function CreditCardSkeleton() {
	return (
		<div className='credit-card credit-card--skeleton'>
			<div className='card-title skeleton-box skeleton-title' />
			<div className='card-balance skeleton-box skeleton-balance' />
		</div>
	)
}
