import { useGoBack } from '@hooks/useGoBack'
import { useTheme } from '@hooks/useTheme'
import { useGetTransactionsQuery } from '@store/api/transactions/transactions.api'
import { SettingsItem } from '@ui/'
import { downloadTransactionsExcel } from '@utils/user-data-download.utils'
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../firebase/auth'
import './Settings.css'

export function Settings() {
	const navigate = useNavigate()
	const { data: transactions = [] } = useGetTransactionsQuery()
	const { theme, toggleTheme, isDark } = useTheme()

	const goBack = useGoBack()

	const handleLogout = async () => {
		await logout()
		navigate('/login')
	}

	const handleDownload = () => downloadTransactionsExcel(transactions)

	return (
		<div className={`settings-page ${theme}`}>
			<div className='container'>
				{' '}
				<div className='settings-header'>
					<button onClick={goBack} className='back-btn'>
						<ChevronLeft size={22} />
					</button>
					<h2>Settings</h2>
				</div>
				<div className='settings-content'>
					<div className='settings-section'>
						<h3>Appearance</h3>
						<SettingsItem
							title='Theme'
							description='Switch between light and dark modes'
							right={
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
							}
						/>
					</div>

					<div className='settings-section'>
						<h3>Categories</h3>
						<SettingsItem
							title='Custom Categories'
							description='Create your own categories'
							onClick={() => navigate('/settings/edit-categories')}
							right={
								<ChevronRight size={20} color={isDark ? '#fff' : '#000'} />
							}
						/>
					</div>

					<div className='settings-section'>
						<h3>Account</h3>
						<SettingsItem
							title='Logout'
							description='Sign out of your Walletly account'
							right={
								<button className='logout-btn' onClick={handleLogout}>
									Logout
								</button>
							}
						/>

						<SettingsItem
							title='Download Data'
							description='Download all your transactions to Excel'
							right={
								<button className='download-btn' onClick={handleDownload}>
									Download
								</button>
							}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
