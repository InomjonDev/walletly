import * as Icons from 'lucide-react'

export function getIconComponentByName(name) {
	return Icons[name] || Icons.CreditCard
}
