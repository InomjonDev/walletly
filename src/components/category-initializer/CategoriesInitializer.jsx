import { AuthContext } from '@context/AuthContext.jsx'
import { SYSTEM_CATEGORIES } from '@shared/categories.shared.jsx'
import {
	useAddCategoryMutation,
	useGetCategoriesQuery,
} from '@store/api/categories/categories.api'
import { useContext, useEffect } from 'react'

export function CategoriesInitializer() {
	const { currentUser } = useContext(AuthContext)
	const { data: categories, isLoading } = useGetCategoriesQuery()
	const [addCategory] = useAddCategoryMutation()

	useEffect(() => {
		if (!isLoading && categories && categories.length === 0 && currentUser) {
			const addCategories = async () => {
				for (const cat of SYSTEM_CATEGORIES) {
					try {
						await addCategory({
							userId: currentUser.uid,
							name: cat.name,
							cat_id: cat.cat_id,
							type: cat.type,
							cat_icon: cat.cat_icon,
						}).unwrap()
					} catch (err) {
						console.error('Failed to add category:', cat, err)
					}
				}
			}
			addCategories()
		}
	}, [isLoading, categories, addCategory, currentUser])

	return null
}
