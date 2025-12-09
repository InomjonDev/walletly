import * as LucideIcons from 'lucide-react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import '../../pages/settings/category/Category.css'
import { ICON_CHOICES } from '../../shared/categories'
import { useAddCategoryMutation } from '../../store/api/categories/categories.api'

export default function CustomCategoryModal({ isOpen, onClose }) {
	const { currentUser } = useContext(AuthContext)
	const [addCategory] = useAddCategoryMutation()

	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [type, setType] = useState('expense')
	const [catIcon, setCatIcon] = useState('CreditCard')
	const [iconSearch, setIconSearch] = useState('')

	if (!isOpen) return null

	const handleSave = async () => {
		setLoading(true)
		const payload = {
			name: name.trim(),
			type,
			cat_icon: catIcon,
			cat_id: name.toLocaleLowerCase().replace(/\s+/g, '_'),
		}
		if (!payload.name) {
			setLoading(false)
			return
		}

		if (!currentUser) {
			console.error('No current user')
			setLoading(false)
			return
		}

		try {
			await addCategory({ userId: currentUser.uid, ...payload }).unwrap()
			onClose()
		} catch (err) {
			console.error('Failed to add category', err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='category-modal-overlay' onClick={onClose}>
			<div className='category-modal' onClick={e => e.stopPropagation()}>
				<div className='category-modal-title'>
					Add Category
					<button className='category-modal-close-btn' onClick={onClose}>
						<LucideIcons.X />
					</button>
				</div>

				<input
					className='category-modal-input'
					placeholder='Category name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				<select
					className='category-modal-input'
					value={type}
					onChange={e => setType(e.target.value)}
				>
					<option value='expense'>Expense</option>
					<option value='income'>Income</option>
				</select>

				<div className='icon-picker-label'>Choose icon</div>
				<input
					className='icon-search'
					placeholder='Search for an icon'
					value={iconSearch}
					onChange={e => setIconSearch(e.target.value)}
				/>
				<div className='icon-picker'>
					{ICON_CHOICES.filter(n =>
						n.toLowerCase().includes(iconSearch.trim().toLowerCase())
					).map(iconName => {
						const I = LucideIcons[iconName] || LucideIcons.Circle
						const selected = iconName === catIcon
						return (
							<button
								key={iconName}
								type='button'
								className={`icon-choice ${selected ? 'selected' : ''}`}
								onClick={() => setCatIcon(iconName)}
							>
								<I size={18} />
							</button>
						)
					})}
				</div>

				<div className='category-modal-actions'>
					<button onClick={handleSave} disabled={loading}>
						{loading ? 'Saving...' : 'Save'}
					</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>
	)
}
