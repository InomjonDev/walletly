import { Spinner } from '@ui/'
import { getIconComponentByName } from '@utils/icons.utils'
import { X } from 'lucide-react'

export function CategoryCard({ cat, onDelete, deleteLoading }) {
	const IconComp = cat?.cat_icon
		? getIconComponentByName(cat.cat_icon)
		: getIconComponentByName('Circle')

	return (
		<div className='category-card'>
			{cat.userId && (
				<button
					type='button'
					className='category-card-delete-btn'
					onClick={() => onDelete?.(cat._id || cat.id)}
				>
					{deleteLoading ? <Spinner size={15} /> : <X size={14} />}
				</button>
			)}
			<div className='category-card__content'>
				<div
					className='category-card__icon-wrapper'
					style={{ backgroundColor: `${cat.color}` }}
				>
					<IconComp size={22} color={'#fff'} />
				</div>
				<span className='category-card__content-name'>{cat.name}</span>
			</div>
		</div>
	)
}
