import { useDashboardLogic } from '@hooks/useDashboardLogic'
import { useTheme } from '@hooks/useTheme'
import { useGetCategoriesQuery } from '@store/api/categories/categories.api'
import {
	Checkbox,
	GoBackButton,
	Input,
	Select,
	TransactionListItem,
} from '@ui/'
import { findCategory, resolveCategoryName } from '@utils/categories.utils'
import {
	calculateTotalExpenses,
	calculateTotalIncome,
} from '@utils/chart.utils'
import { useEffect, useState } from 'react'

import './Transactions.css'

export function Transactions() {
	const { theme } = useTheme()
	const { data: categories_options } = useGetCategoriesQuery()
	const [selectedCategory, setSelectedCategory] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [showIncome, setShowIncome] = useState(false)
	const [showExpense, setShowExpense] = useState(true)

	useEffect(() => {
		setSelectedCategory('')
	}, [showIncome, showExpense])

	const { transactions, categories } = useDashboardLogic()

	const filteredTransactions =
		transactions?.filter(t => {
			const category = findCategory(categories, t)
			const categoryName = resolveCategoryName(category, t)

			const matchesCategory =
				!selectedCategory || category?._id === selectedCategory
			const matchesSearch =
				!searchTerm ||
				categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				t.notes.toLowerCase().includes(searchTerm.toLowerCase())
			const matchesType =
				(!showIncome && !showExpense) ||
				(showIncome && t.type === 'income') ||
				(showExpense && t.type === 'expense')

			return matchesCategory && matchesSearch && matchesType
		}) || []

	const options = categories_options
		? [
				{ value: '', label: 'All' },
				...categories_options
					.filter(cat => {
						if (showIncome) return cat.type === 'income'
						if (showExpense) return cat.type === 'expense'
						return true
					})
					.map(cat => ({ value: cat._id, label: cat.name })),
		  ]
		: [{ value: '', label: 'All' }]

	const totalExpenses = calculateTotalExpenses(filteredTransactions)
	const totalIncome = calculateTotalIncome(filteredTransactions)

	const groupedByDate = filteredTransactions.reduce((acc, t) => {
		const date = new Date(t.createdAt)
		const dateKey = date.toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		})

		if (!acc[dateKey]) acc[dateKey] = []
		acc[dateKey].push(t)

		return acc
	}, {})

	const sortedDates = Object.keys(groupedByDate).sort(
		(a, b) => new Date(b) - new Date(a)
	)

	return (
		<div className={`transactions-page ${theme}`}>
			<div className='container'>
				<div className='transactions-header'>
					<GoBackButton />
					<h2>Transactions</h2>
				</div>

				<div className='transactions-content'>
					<div className='transactions-actions'>
						<Input
							placeholder='Search...'
							type='search'
							value={searchTerm}
							onChange={setSearchTerm}
						/>
						<Select
							value={selectedCategory}
							onChange={setSelectedCategory}
							options={options}
							placeholder='Select category'
						/>
						<div className='transactions-actions-checkboxes'>
							<Checkbox
								label='Expense'
								value={showExpense}
								onChange={value => {
									setShowExpense(value)
									if (value) setShowIncome(false)
								}}
							/>
							<Checkbox
								label='Income'
								value={showIncome}
								onChange={value => {
									setShowIncome(value)
									if (value) setShowExpense(false)
								}}
							/>
						</div>
					</div>
					{/* Total amount display is currently commented out */}
					{/* {(showIncome || showExpense) && filteredTransactions.length > 0 && (
						<div className='transactions-total'>
							Total {showIncome ? 'Income' : 'Expenses'}:{' '}
							<span className={`amount ${showIncome ? 'income' : 'expense'}`}>
								{formatTotalAmount(showIncome ? totalIncome : totalExpenses)}{' '}
								UZS
							</span>
						</div>
					)} */}
					<div className='transactions-list'>
						{sortedDates.map(date => (
							<div key={date} className='transactions-day-group'>
								<div className='transactions-day-title'>{date}</div>

								{groupedByDate[date].map(t => (
									<TransactionListItem
										key={t._id}
										transaction={t}
										categories={categories}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
