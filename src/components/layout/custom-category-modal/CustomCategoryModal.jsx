import useCustomCategoryForm from '@hooks/useCustomCategoryForm'
import { IconPicker, Input, Select } from '@ui/'
import * as LucideIcons from 'lucide-react'
import './CustomCategoryModal.css'

export function CustomCategoryModal({ isOpen, onClose }) {
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
		reset,
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

				<Input
					value={name}
					onChange={setName}
					placeholder='Enter category name'
				/>

				<Select
					value={type}
					onChange={setType}
					options={[
						{ label: 'Expense', value: 'expense' },
						{ label: 'Income', value: 'income' },
					]}
				/>

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
					<button
						onClick={() => {
							reset()
							onClose()
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
