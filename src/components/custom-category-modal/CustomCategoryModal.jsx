import * as LucideIcons from 'lucide-react'
import useCustomCategoryForm from '../../hooks/useCustomCategoryForm'
import IconPicker from '../icon/IconPicker'
import './CustomCategoryModal.css'

export default function CustomCategoryModal({ isOpen, onClose }) {
	const {
		loading,
		name,
		setName,
		type,
		setType,
		catIcon,
		setCatIcon,
		iconSearch,
		setIconSearch,
		handleSave,
	} = useCustomCategoryForm({ onClose })

	if (!isOpen) return null

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
				<IconPicker
					value={catIcon}
					onChange={setCatIcon}
					search={iconSearch}
					setSearch={setIconSearch}
				/>

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
