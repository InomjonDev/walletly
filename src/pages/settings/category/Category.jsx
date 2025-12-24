import { useEscape } from '@hooks/useEscape.hooks'
import { useGoBack } from '@hooks/useGoBack'
import { useTheme } from '@hooks/useTheme'
import { CustomCategoryModal } from '@layout/'
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from '@store/api/categories/categories.api'
import { CategoryCard, FilterToggle } from '@ui/'
import { ChevronLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import './Category.css'

export function Category() {
	const { data: allCategories } = useGetCategoriesQuery()
	const { theme } = useTheme()
	const goBack = useGoBack()

	const [modalOpen, setModalOpen] = useState(false)
	const [filter, setFilter] = useState('income')
	const [deletingId, setDeletingId] = useState(null)

	const [deleteCategoryApi] = useDeleteCategoryMutation()

	useEscape(() => {
		if (modalOpen) setModalOpen(false)
	})

	const filteredCategories = useMemo(() => {
		if (!allCategories) return []
		return allCategories.filter(cat => cat.type === filter)
	}, [allCategories, filter])

	const handleDelete = async id => {
		if (!id) return
		setDeletingId(id)
		try {
			await deleteCategoryApi(id).unwrap()
		} finally {
			setDeletingId(null)
		}
	}

	return (
		<div className={`categories-page ${theme}`}>
			<div className='container'>
				<div className='categories-header'>
					<button className='back-btn' onClick={goBack}>
						<ChevronLeft size={20} />
					</button>
					<h2>Categories</h2>
				</div>

				<FilterToggle filterState={filter} onChange={setFilter} />

				<div className='categories-grid'>
					{filteredCategories.map(cat => (
						<CategoryCard
							key={cat._id || cat.id}
							cat={cat}
							onDelete={handleDelete}
							deleteLoading={deletingId === (cat._id || cat.id)}
						/>
					))}
				</div>

				<CustomCategoryModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
				/>
			</div>

			{!modalOpen && (
				<div className='fixed-add-btn'>
					<button
						className='add-category-btn'
						onClick={() => setModalOpen(true)}
					>
						Add Category
					</button>
				</div>
			)}
		</div>
	)
}
