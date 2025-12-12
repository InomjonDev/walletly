import { AuthContext } from '@context/AuthContext'
import { useAddCategoryMutation } from '@store/api/categories/categories.api'
import {
	buildCategoryPayload,
	isValidCategoryName,
} from '@utils/category.utils'
import { useContext, useState } from 'react'

export default function useCustomCategoryForm({ onClose } = {}) {
	const { currentUser } = useContext(AuthContext)
	const [addCategory] = useAddCategoryMutation()

	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [type, setType] = useState('expense')
	const [catIcon, setCatIcon] = useState('CreditCard')
	const [iconSearch, setIconSearch] = useState('')

	const reset = () => {
		setName('')
		setType('expense')
		setCatIcon('CreditCard')
		setIconSearch('')
		setLoading(false)
	}

	const handleSave = async () => {
		if (!isValidCategoryName(name)) {
			return
		}
		if (!currentUser) {
			console.error('No current user')
			return
		}

		setLoading(true)
		try {
			const payload = buildCategoryPayload({ name, type, catIcon })
			await addCategory({ userId: currentUser.uid, ...payload }).unwrap()
			onClose?.()
			reset()
		} catch (err) {
			console.error('Failed to add category', err)
		} finally {
			setLoading(false)
		}
	}

	return {
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
	}
}
