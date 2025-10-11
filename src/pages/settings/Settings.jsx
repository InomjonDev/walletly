import { ChevronLeft, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../firebase/auth'
import { useTheme } from '../../hooks/useTheme'
import { useGetTransactionsQuery } from '../../store/api/transactions/transactions.api'
import { downloadTransactionsExcel } from '../../utils/user-data-download'
import './Settings.css'

export function Settings() {
	const navigate = useNavigate()
	const { data: transactions = [] } = useGetTransactionsQuery()
	const { theme, toggleTheme, isDark } = useTheme()

	const handleLogout = async () => {
		await logout()
		navigate('/login')
	}

	const handleDownload = () => downloadTransactionsExcel(transactions)

	return (
		<div className={`settings-page ${theme}`}>
			<div className='settings-header'>
				<button onClick={() => navigate(-1)} className='back-btn'>
					<ChevronLeft size={22} />
				</button>
				<h2>Settings</h2>
			</div>

			<div className='settings-content'>
				<div className='settings-section'>
					<h3>Appearance</h3>
					<div className='settings-item'>
						<div className='item-info'>
							<span>Theme</span>
							<p>Switch between light and dark modes</p>
						</div>
						<div className='theme-toggle'>
							<button
								className={`theme-btn light ${!isDark ? 'active' : ''}`}
								onClick={() => theme !== 'light' && toggleTheme('light')}
							>
								<Sun size={20} />
							</button>
							<button
								className={`theme-btn dark ${isDark ? 'active' : ''}`}
								onClick={() => theme !== 'dark' && toggleTheme('dark')}
							>
								<Moon size={20} />
							</button>
						</div>
					</div>
				</div>

				<div className='settings-section'>
					<h3>Account</h3>
					<div className='settings-item'>
						<div className='item-info'>
							<span>Logout</span>
							<p>Sign out of your Walletly account</p>
						</div>
						<button className='logout-btn' onClick={handleLogout}>
							Logout
						</button>
					</div>

					<div className='settings-item'>
						<div className='item-info'>
							<span>Download Data</span>
							<p>Download all your transactions to Excel</p>
						</div>
						<button className='download-btn' onClick={handleDownload}>
							Download
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
