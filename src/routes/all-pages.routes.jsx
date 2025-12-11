import { Analytics } from '@pages/analytics/Analytics'
import { Dashboard } from '@pages/dashboard/Dashboard'
import { Settings } from '@pages/settings/Settings'
import { Category } from '@pages/settings/category/Category'

export const pages = [
	{ path: '/', element: <Dashboard /> },
	{ path: '/analytics', element: <Analytics /> },
	{ path: '/settings', element: <Settings /> },
	{ path: '/settings/edit-categories', element: <Category /> },
]
