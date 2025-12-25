import { useDashboardLogic } from '@hooks/useDashboardLogic'
import { AddTransactionForm, DashboardChartBlock } from '@layout/'
import { CreditCardSkeleton } from '@skeletons/'
import { CreditCard, Modal } from '@ui/'
import {
	ArrowDownLeft,
	ArrowUpRight,
	ChartColumnBig,
	EllipsisVertical,
} from 'lucide-react'
import { useContext, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import './Dashboard.css'

export function Dashboard() {
	const { currentUser } = useContext(AuthContext)
	const navigate = useNavigate()
	const {
		transactions,
		categories,
		loadingTransactions,
		loadingCategories,
		formVisible,
		setFormVisible,
		balance,
	} = useDashboardLogic()

	const [formType, setFormType] = useState('income')

	const openModal = type => {
		setFormType(type)
		setFormVisible(true)
	}

	const closeModal = () => {
		setFormVisible(false)
	}

	const incomeStats = useMemo(() => {
		const incomeTx = transactions.filter(t => t.type === 'income')
		const incomeCat = categories.filter(cat => cat.type === 'income')

		const map = {}

		for (const t of incomeTx) {
			if (!map[t.category]) {
				const cat = incomeCat.find(c => c._id === t.category)

				map[t.category] = {
					id: cat?._id,
					label: cat?.name,
					value: 0,
					color: cat?.color,
				}
			}
			map[t.category].value += t.amount
		}

		const data = Object.values(map)

		const topTwo = [...data].sort((a, b) => b.value - a.value).slice(0, 2)

		return { chartData: data, topTwo }
	}, [transactions, categories])

	return (
		<div className='dashboard-container'>
			<div className='dashboard-header'>
				<h2 className='header-text'>Hello, {currentUser.displayName}</h2>
				<div className='header-right'>
					<Link to='/settings' className='back-btn'>
						<EllipsisVertical size={20} />
					</Link>
				</div>
			</div>

			<Modal isOpen={formVisible} onRequestClose={closeModal}>
				<AddTransactionForm onClose={closeModal} defaultType={formType} />
			</Modal>

			{loadingTransactions || loadingCategories ? (
				<CreditCardSkeleton />
			) : (
				<CreditCard title='Walletly' balance={balance} currency='UZS' />
			)}

			<div className='action-buttons'>
				<button className='income-btn' onClick={() => openModal('income')}>
					<ArrowUpRight />
				</button>
				<button className='expense-btn' onClick={() => openModal('expense')}>
					<ArrowDownLeft />
				</button>

				{transactions.length > 0 && (
					<button
						className='chart-btn'
						onClick={() => navigate('/transactions')}
					>
						<ChartColumnBig />
					</button>
				)}
			</div>

			{transactions.length > 0 && <DashboardChartBlock data={incomeStats} />}
		</div>
	)
}
