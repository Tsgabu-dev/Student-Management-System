import { useEffect, useId, useRef, type ReactNode } from 'react'
import './Modal.css'

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	title: ReactNode
	description?: ReactNode
	children: ReactNode
	footer?: ReactNode
}

function Modal({ isOpen, onClose, title, description, children, footer }: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const titleId = useId()
	const descriptionId = useId()

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		if (isOpen && !dialog.open) dialog.showModal()
		if (!isOpen && dialog.open) dialog.close()
	}, [isOpen])

	return (
		<dialog
			ref={dialogRef}
			className="modal"
			aria-labelledby={titleId}
			aria-describedby={description ? descriptionId : undefined}
			onCancel={onClose}
			onClose={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose()
			}}
		>
			<header className="modal__header">
				<div className="modal__heading">
					<h2 className="modal__title" id={titleId}>{title}</h2>
					{description && <p className="modal__description" id={descriptionId}>{description}</p>}
				</div>
				<button className="modal__close" type="button" aria-label="Close dialog" onClick={onClose}>
					<span aria-hidden="true">×</span>
				</button>
			</header>
			<div className="modal__body">{children}</div>
			{footer && <footer className="modal__footer">{footer}</footer>}
		</dialog>
	)
}

export default Modal