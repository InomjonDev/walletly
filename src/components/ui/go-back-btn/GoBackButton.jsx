import { useGoBack } from '@hooks/useGoBack'
import { ChevronLeft } from 'lucide-react'
import './GoBackButton.css'

export function GoBackButton() {
	const goBack = useGoBack()
	return (
		<button className='back-btn' onClick={goBack}>
			<ChevronLeft size={20} />
		</button>
	)
}
