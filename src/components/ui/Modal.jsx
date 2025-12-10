import { useEffect, useState } from 'react'
import './Modal.css'

export default function Modal({ isOpen, onRequestClose, children }) {
	const [active, setActive] = useState(false)

	useEffect(() => {
		let t
		if (isOpen) {
			// mount then set active to trigger CSS animation
			t = setTimeout(() => setActive(true), 10)
		} else {
			setActive(false)
		}
		return () => clearTimeout(t)
	}, [isOpen])

	if (!isOpen) return null

	const handleOverlayClick = e => {
		if (e.target.classList.contains('modal-overlay')) {
			// start closing animation, then call onRequestClose after delay
			setActive(false)
			setTimeout(() => onRequestClose?.(), 400)
		}
	}

	return (
		<div
			className={`modal-overlay ${active ? 'show' : ''}`}
			onClick={handleOverlayClick}
		>
			<div
				className={`modal-content ${active ? 'animate' : ''}`}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}
