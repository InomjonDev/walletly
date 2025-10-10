import { useEffect } from 'react'
import {
	useAddCategoryMutation,
	useGetCategoriesQuery,
} from '../../store/api/categories/categories.api'

const defaultCategories = [
	{ name: 'Food' },
	{ name: 'Transport' },
	{ name: 'Shopping' },
	{ name: 'Entertainment' },
]

export function CategoriesInitializer() {
	const { data: categories, isLoading } = useGetCategoriesQuery()
	const [addCategory] = useAddCategoryMutation()

	useEffect(() => {
		if (!isLoading && categories && categories.length === 0) {
			defaultCategories.forEach(cat => {
				addCategory(cat)
			})
		}
	}, [isLoading, categories, addCategory])

	return null // This component does not render anything
}
