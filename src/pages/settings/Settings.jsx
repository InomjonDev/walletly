import { ChevronLeft, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

export function Settings() {
	const navigate = useNavigate()

	return (
		<div className='settings-page'>
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
							<button className='theme-btn light'>
								<Sun size={20} />
							</button>
							<button className='theme-btn dark'>
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
						<button className='logout-btn'>Logout</button>
					</div>
				</div>
			</div>
		</div>
	)
}
