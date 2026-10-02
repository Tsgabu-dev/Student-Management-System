import type { HTMLAttributes, ReactNode } from 'react'
import './Badge.css'

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	variant?: BadgeVariant
	children: ReactNode
}

function Badge({ children, variant = 'neutral', className = '', ...props }: BadgeProps) {
	const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ')

	return <span {...props} className={classes}>{children}</span>
}

export default Badge