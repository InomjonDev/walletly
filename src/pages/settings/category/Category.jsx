import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import CategoryCard from '../../../components/category-card/CategoryCard'
import CustomCategoryModal from '../../../components/custom-category-modal/CustomCategoryModal'
import { useGoBack } from '../../../hooks/useGoBack'
import { useTheme } from '../../../hooks/useTheme'
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from '../../../store/api/categories/categories.api'
import './Category.css'

export function Category() {
	const { data: allCategories } = useGetCategoriesQuery()
	const { theme } = useTheme()
	const goBack = useGoBack()

	const [modalOpen, setModalOpen] = useState(false)

	const openCreate = () => setModalOpen(true)
	const closeModal = () => setModalOpen(false)

	const [deleteCategoryApi] = useDeleteCategoryMutation()

	const handleDelete = async id => {
		if (!id) return
		try {
			await deleteCategoryApi(id).unwrap()
		} catch (err) {
			console.error('Delete failed', err)
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
				<div className='categories-grid'>
					{allCategories?.map(cat => (
						<CategoryCard
							key={cat?._id || cat?.id}
							cat={cat}
							onDelete={handleDelete}
						/>
					))}
				</div>

				<CustomCategoryModal isOpen={modalOpen} onClose={closeModal} />
			</div>

			{!modalOpen && (
				<div className='fixed-add-btn'>
					<button className='add-category-btn' onClick={openCreate}>
						Add Category
					</button>
				</div>
			)}
		</div>
	)
}
