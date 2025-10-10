import { Home, LogOut, Wallet } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

export default function Sidebar() {
	const { logout } = useAuth()

	return (
		<aside className='sidebar'>
			<div className='sidebar-logo'>
				<h1>Walletly</h1>
			</div>

			<nav className='sidebar-nav'>
				<ul>
					<li>
						<Home size={20} />
						<span>Dashboard</span>
					</li>
					<li>
						<Wallet size={20} />
						<span>Transactions</span>
					</li>
				</ul>
			</nav>

			<button className='sidebar-logout' onClick={logout}>
				<LogOut size={20} />
				<span>Logout</span>
			</button>
		</aside>
	)
}
