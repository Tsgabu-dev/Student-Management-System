import { useId, type HTMLAttributes, type ReactNode } from 'react'
import './Card.css'

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	title?: ReactNode
	description?: ReactNode
	action?: ReactNode
	footer?: ReactNode
}

function Card({
	title,
	description,
	action,
	footer,
	children,
	className = '',
	'aria-labelledby': ariaLabelledBy,
	...props
}: CardProps) {
	const titleId = useId()
	const cardClassName = ['card', className].filter(Boolean).join(' ')

	return (
		<section
			{...props}
			className={cardClassName}
			aria-labelledby={ariaLabelledBy ?? (title ? titleId : undefined)}
		>
			{(title || description || action) && (
				<header className="card__header">
					<div className="card__heading">
						{title && <h2 className="card__title" id={titleId}>{title}</h2>}
						{description && <p className="card__description">{description}</p>}
					</div>
					{action && <div className="card__action">{action}</div>}
				</header>
			)}
			<div className="card__body">{children}</div>
			{footer && <footer className="card__footer">{footer}</footer>}
		</section>
	)
}

export default Card