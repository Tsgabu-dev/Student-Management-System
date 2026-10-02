import type { ReactNode } from 'react'
import './Alert.css'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

type AlertProps = {
	variant?: AlertVariant
	title?: ReactNode
	children: ReactNode
	onDismiss?: () => void
}

function Alert({ variant = 'info', title, children, onDismiss }: AlertProps) {
	const isUrgent = variant === 'warning' || variant === 'danger'

	return (
		<div
			className={`alert alert--${variant}`}
			role={isUrgent ? 'alert' : 'status'}
			aria-live={isUrgent ? 'assertive' : 'polite'}
		>
			<div className="alert__content">
				{title && <strong className="alert__title">{title}</strong>}
				<div className="alert__message">{children}</div>
			</div>
			{onDismiss && (
				<button
					className="alert__dismiss"
					type="button"
					aria-label="Dismiss alert"
					onClick={onDismiss}
				>
					<span aria-hidden="true">×</span>
				</button>
			)}
		</div>
	)
}

export default Alert