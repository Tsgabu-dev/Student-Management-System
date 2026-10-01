import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
	variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
	leadingIcon?: ReactNode
	trailingIcon?: ReactNode
	loading?: boolean
}

function Button({
	children,
	variant = 'primary',
	size = 'md',
	type = 'button',
	leadingIcon,
	trailingIcon,
	loading = false,
	disabled = false,
	className = '',
	...props
}: ButtonProps) {
	const classes = [
		'button',
		`button--${variant}`,
		`button--${size}`,
		loading && 'button--loading',
		className,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			{...props}
			type={type}
			className={classes}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
		>
			{loading ? <span className="button__spinner" aria-hidden="true" /> : leadingIcon}
			{children && <span className="button__label">{children}</span>}
			{!loading && trailingIcon}
		</button>
	)
}

export default Button