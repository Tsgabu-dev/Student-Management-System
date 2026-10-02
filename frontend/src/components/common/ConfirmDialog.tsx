import type { ReactNode } from 'react'
import Button from './Button'
import Modal from './Modal'

type ConfirmDialogProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title: ReactNode
	children: ReactNode
	confirmLabel?: string
	cancelLabel?: string
	variant?: 'primary' | 'danger'
	isConfirming?: boolean
}

function ConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	children,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	variant = 'danger',
	isConfirming = false,
}: ConfirmDialogProps) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={title}
			footer={
				<>
					<Button variant="secondary" disabled={isConfirming} onClick={onClose}>
						{cancelLabel}
					</Button>
					<Button
						variant={variant}
						loading={isConfirming}
						disabled={isConfirming}
						onClick={onConfirm}
					>
						{confirmLabel}
					</Button>
				</>
			}
		>
			{children}
		</Modal>
	)
}

export default ConfirmDialog