import * as LucideIcons from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { useContext, useState } from 'react'
import CustomCategoryModal from '../../../components/custom-category-modal/CustomCategoryModal'
import { AuthContext } from '../../../context/AuthContext'
import { useGoBack } from '../../../hooks/useGoBack'
import { useTheme } from '../../../hooks/useTheme'
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from '../../../store/api/categories/categories.api'
import './Category.css'

export function Category() {
	const { data: allCategories } = useGetCategoriesQuery()
	const [deleteCategoryApi] = useDeleteCategoryMutation()
	const { theme } = useTheme()
	const goBack = useGoBack()
	const { currentUser } = useContext(AuthContext)

	const [modalOpen, setModalOpen] = useState(false)

	const openCreate = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
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
					{allCategories?.map(cat => {
						const Icon = LucideIcons[cat.cat_icon] || LucideIcons.Circle

						return (
							<div key={cat?._id || cat?.id} className='category-card system'>
								{cat.userId && (
									<button
										type='button'
										className='category-card-delete-btn'
										onClick={async () => {
											try {
												await deleteCategoryApi(cat._id || cat.id).unwrap()
											} catch (err) {
												console.error('Delete failed', err)
											}
										}}
									>
										<LucideIcons.X size={14} />
									</button>
								)}
								<div className='category-name'>
									<Icon size={18} />
									<span>{cat.name}</span>
								</div>
								<div className='category-type'>{cat.type}</div>
							</div>
						)
					})}
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
