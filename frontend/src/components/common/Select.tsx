import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import './Field.css'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string
	hint?: string
	error?: string
	leadingIcon?: ReactNode
	wrapperClassName?: string
}

function Select({
	id,
	label,
	hint,
	error,
	leadingIcon,
	wrapperClassName = '',
	className = '',
	disabled = false,
	required = false,
	children,
	...props
}: SelectProps) {
	const generatedId = useId()
	const selectId = id ?? generatedId
	const hintId = hint ? `${selectId}-hint` : undefined
	const errorId = error ? `${selectId}-error` : undefined
	const describedBy = [props['aria-describedby'], hintId, errorId]
		.filter(Boolean)
		.join(' ') || undefined
	const controlClassName = [
		'field-control',
		error && 'field-control--error',
		disabled && 'field-control--disabled',
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={['form-field', wrapperClassName].filter(Boolean).join(' ')}>
			{label && (
				<label className="form-field__label" htmlFor={selectId}>
					{label}
					{required && <span className="form-field__required" aria-hidden="true">*</span>}
				</label>
			)}
			<div className={controlClassName}>
				{leadingIcon && <span className="field-control__icon" aria-hidden="true">{leadingIcon}</span>}
				<select
					{...props}
					id={selectId}
					className={['field-control__select', className].filter(Boolean).join(' ')}
					disabled={disabled}
					required={required}
					aria-invalid={error ? true : props['aria-invalid']}
					aria-describedby={describedBy}
				>
					{children}
				</select>
			</div>
			{hint && <span className="form-field__hint" id={hintId}>{hint}</span>}
			{error && <span className="form-field__error" id={errorId} role="alert">{error}</span>}
		</div>
	)
}

export default Select