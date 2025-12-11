import { getIconComponentByName } from '@utils/icons.utils'
import { X } from 'lucide-react'

export default function CategoryCard({ cat, onDelete }) {
	const IconComp = cat?.cat_icon
		? getIconComponentByName(cat.cat_icon)
		: getIconComponentByName('Circle')

	return (
		<div key={cat?._id || cat?.id} className='category-card system'>
			{cat.userId && (
				<button
					type='button'
					className='category-card-delete-btn'
					onClick={() => onDelete?.(cat._id || cat.id)}
				>
					<X size={14} />
				</button>
			)}
			<div className='category-name'>
				<IconComp size={18} />
				<span>{cat.name}</span>
			</div>
			<div className='category-type'>{cat.type}</div>
		</div>
	)
}
