import { categoryIcons } from '@shared/categories.shared.jsx'
import { findCategory, resolveCategoryName } from '@utils/categories.utils'
import { formatAmount, formatDateTimeISO } from '@utils/format.utils'
import { getIconComponentByName } from '@utils/icons.utils'
import './TransactionListItem.css'

export function TransactionListItem({ transaction, categories }) {
	const category = findCategory(categories, transaction)
	const categoryName = resolveCategoryName(category, transaction)

	let IconElement = null
	const IconCompFromTransaction = transaction.cat_icon
		? getIconComponentByName(transaction.cat_icon)
		: null
	const IconCompFromCategory = category?.cat_icon
		? getIconComponentByName(category.cat_icon)
		: null

	if (transaction.cat_icon && IconCompFromTransaction) {
		IconElement = <IconCompFromTransaction size={20} />
	} else if (category?.cat_icon && IconCompFromCategory) {
		IconElement = <IconCompFromCategory size={20} />
	} else if (categoryIcons[categoryName]) {
		IconElement = categoryIcons[categoryName]
	} else {
		const Fallback = getIconComponentByName('CreditCard')
		IconElement = <Fallback size={20} />
	}

	return (
		<div
			key={transaction._id}
			className={`transaction-item ${transaction.type}`}
		>
			<div className={`transaction-icon-block ${transaction.type}`}>
				{IconElement}
			</div>
			<div className='transaction-left'>
				<span className='transaction-category'>{categoryName}</span>
				<span className='transaction-note'>{transaction.notes}</span>
			</div>
			<div className='transaction-right'>
				<span className='transaction-amount'>
					{transaction.type === 'expense' ? '-' : '+'}{' '}
					{formatAmount(transaction.amount)} UZS
				</span>
				<span className='transaction-date'>
					{formatDateTimeISO(transaction.createdAt)}
				</span>
			</div>
		</div>
	)
}
